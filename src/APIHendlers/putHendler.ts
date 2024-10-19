import http from "http";
import { DBHendler } from "../DBHendlers/dbHendler";

type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};
function isUUIDv4(uuid: string): boolean {
  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Regex.test(uuid);
}
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

export class PUTHendler {
  //  users = [];
  private dBHendler = new DBHendler();

  public getUserData(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    data: string,
  ): void {
    const urlParts = req.url?.split("/");
    const userId = urlParts?.[2];
    if (!(urlParts?.[1] === "users" && userId && urlParts?.length === 2)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "request to non-existing endpoint" }));
      return;
    }
    if (!isUUIDv4(userId)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "userId is invalid (not uuid)" }));
      return;
    }
    if (!data) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "body is empty" }));
      return;
    }
    try {
      // const parsedData: unknown =
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
    const userIndex = this.dBHendler.findUserByID(userId); //  users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }
    //   const parseData = JSON.parse(String(data));
    // if (this.dBHendler.chekValidUserUpdateData(parseData)) {
    const user = this.dBHendler.uppdateUser(userIndex, parsedData);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  }
}
