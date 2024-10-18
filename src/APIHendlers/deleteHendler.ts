import http from "http";
import { DBHendler } from "../DBHendlers/dbHendler";

function isUUIDv4(uuid: string): boolean {
  const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Regex.test(uuid);
}

export class DeleteHendler {
  private dBHendler = new DBHendler();

  public getUserData(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ): void {
    const urlParts = req.url?.split("/");
    const userId = urlParts?.[2];
    if (urlParts?.[1] === "users" && userId) {
      if ( !isUUIDv4(userId)){
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "userId is invalid (not uuid)" }));
        return
      }
      const userIndex = this.dBHendler.findUserByID(userId); // users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
      } else {
        this.dBHendler.delUserByID(userId);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User has been deleted" }));
      }
     }
    else{
 
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "request to non-existing endpoint" }));
      
    }

  }
}
