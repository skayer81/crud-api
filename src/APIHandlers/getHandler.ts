import http from "http";
import { DBHandler } from "../DBHandlers/dbHandler";
import * as check from "../utils/inspectorsAPI"
import * as replies from '../utils/sendingReplies'

export class GETHandler {
  private dBHandler = new DBHandler();

  public getUserData(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ): void {
   // throw new Error(" ttt");
      if (check.endpointIsValid(req.url)) {
        const users = this.dBHandler.getAllUsers();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
        return
      }
      if (!check.endpointIsValid(req.url, true)) {
        replies.nonExistingEndpoint(res);
        return
      }
      const userID = check.getUserID(req.url || '');
      if (!check.isUUIDv4(userID)) {
        replies.nonUUID(res)
        return;
      }
          const user = this.dBHandler.getUserByID(userID); 
         if (!user) {
          replies.userNotFound(res)
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));

    } 

    
}

