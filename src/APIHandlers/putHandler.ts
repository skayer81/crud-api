import http from "http";
import { PartialUser } from "src/types";
import { DBHandler } from "../DBHandlers/dbHandler";
import * as check from "../utils/inspectorsAPI"
import * as replies from '../utils/sendingReplies'

function isUser (data: unknown): data is PartialUser{
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  const isUsernameValid = typeof obj.username === "string";
  const isAgeValid = typeof obj.age === "number" && !Number.isNaN(obj.age);
  const isHobbiesValid = Array.isArray(obj.hobbies) && obj.hobbies.every(hobby => typeof hobby === "string");

  return isUsernameValid || isAgeValid || isHobbiesValid;
}

function parseUserData(data: string, res: http.ServerResponse): PartialUser | null {
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

export class PUTHandler {

  private dBHandler = new DBHandler();

  public getUserData(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    data: string,
  ): void {
    if (!check.endpointIsValid(req.url, true)){
      replies.nonExistingEndpoint(res);
    }
    const userID = check.getUserID(req.url || '');
    if (!check.isUUIDv4(userID)) {
      replies.nonUUID(res)
      return;
    }
    const finduser = this.dBHandler.getUserByID(userID); 
    if (!finduser) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `User with id=${userID}  not found` }),
      );
      return;
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
    let user = this.dBHandler.getUserByID(userID); 
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }
    user = this.dBHandler.uppdateUser(userID, parsedData);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  }
}
