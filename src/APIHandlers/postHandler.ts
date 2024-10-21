import http from "http";
import { User } from "src/types";
import { DBHandler } from "../DBHandlers/dbHandler"; 
import * as check from "../utils/inspectorsAPI"
import * as replies from '../utils/sendingReplies'


// type User = {
//   id?: string;
//   username: string;
//   age: number;
//   hobbies: string[];
// };

function isUser(data: unknown): data is User {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.username === "string" &&
    !Number.isNaN(Number(obj.age)) && // === 'number'
    Array.isArray(obj.hobbies) // &&
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
    console.error("Invalid User data:", parsedData);
    return null;
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Error parsing JSON : ${data}` }));
    //  console.error('Error parsing JSON:');
    return null;
  }
}

// const parseData: User = JSON.parse(String(data));

export class POSTHandler {
  //  users = [];
  private dBHandler = new DBHandler(); // .getInstance

  public getUserData(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    data: string,
  ): void {
    console.log("post..........");
    // const urlParts = req.url?.split("/"); // Проверить что нет "/" в конце
    // if (!(urlParts?.[1] === "users") || urlParts?.length > 2) {
    //   res.writeHead(404, { "Content-Type": "application/json" });
    //   res.end(JSON.stringify({ message: "request to non-existing endpoint" }));
    //   return;
    // }
    if (!check.endpointIsValid(req.url)){
      replies.nonExistingEndpoint(res);
    }
    if (!data) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "body is empty" }));
      return;
    }
    try {
      //  const parsedData: unknown =
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

