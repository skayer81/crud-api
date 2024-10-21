import http from "http";
import { DBHandler } from "../DBHandlers/dbHandler";
import * as check from "../utils/inspectorsAPI"
import * as replies from '../utils/sendingReplies'

function isUUIDv4(uuid: string): boolean {
  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Regex.test(uuid);
}

export class DeleteHandler {
  private dBHandler = new DBHandler();

  public getUserData(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ): void {
    if (!check.endpointIsValid(req.url, true)){
      replies.nonExistingEndpoint(res);
    }
    const userID = check.getUserID(req.url || '');
    if (!check.isUUIDv4(userID)) {
      replies.nonUUID(res)
      return;
    }
   // const urlParts = req.url?.split("/");
   // const userId = urlParts?.[2];
    // if (urlParts?.[1] === "users" && userId) {
    //   if (!isUUIDv4(userId)) {
    //     res.writeHead(400, { "Content-Type": "application/json" });
    //     res.end(JSON.stringify({ message: "userId is invalid (not uuid)" }));
    //     return;
    //   }
      const userIndex = this.dBHandler.findUserByID(userID); // users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
      } else {
        this.dBHandler.delUserByID(userID);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User has been deleted" }));
      }
    // } else {
    //   res.writeHead(404, { "Content-Type": "application/json" });
    //   res.end(JSON.stringify({ message: "request to non-existing endpoint" }));
    // }
  }
}

