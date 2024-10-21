import http from "http";
import { User } from "src/types";
import { DBHandler } from "../DBHandlers/dbHandler"; 
import * as check from "../utils/inspectorsAPI"
import * as replies from '../utils/sendingReplies'


function isUser(data: unknown): data is User {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.username === "string" &&
    !Number.isNaN(Number(obj.age)) &&
    Array.isArray(obj.hobbies) 
  );
}

function requiredFieldnotEmpty(userData: User): boolean {
  const { username, age, hobbies } = userData;
  if (!username || !age || !Array.isArray(hobbies)) {
    return false;
  }
  return true;
}

function parseUserData(data: string, res: http.ServerResponse): User | null {
  try {
    const parsedData: unknown = JSON.parse(data);
    if (isUser(parsedData)) {
      return parsedData;
    }
    return null;
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Error parsing JSON : ${data}` }));
    return null;
  }
}

export class POSTHandler {
  private dBHandler = new DBHandler();

  public getUserData(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    data: string,
  ): void {

        if (!check.endpointIsValid(req.url)){
      replies.nonExistingEndpoint(res);
      return
    }
    if (!data) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "body is empty" }));
      return;
    }
    try {
      JSON.parse(data);
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Error parsing JSON : ${data}` }));
      return;
    }
    const parsedData: unknown = parseUserData(data, res);
    if (!isUser(parsedData)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Invalid User data : ${data}` }));
      return;
    }
    const chekUserRes = requiredFieldnotEmpty(parsedData);

    if (chekUserRes) {
      const newUser = this.dBHandler.addUser(parsedData);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Required fields are missing or invalid" }),
      );
    }
  }
}

