import http from "http";
// import { v4 as uuidv4 } from "uuid";
import { DBHendler } from "../DBHendlers/dbHendler";

  function isUUIDv4(uuid: string): boolean {
    const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidv4Regex.test(uuid);
  }

export class GETHendler {
  private dBHendler = new DBHendler();
//  0ad60c15-60c0-4f55-8a7c-33374afbf11e

  public getUserData(

    req: http.IncomingMessage,
    res: http.ServerResponse,
  ) : void{
    console.log("get..........");
    const urlParts = req.url?.split("/");
    const userId = urlParts?.[2];
    console.log(urlParts, req.url);
    if (urlParts?.[1] === "users") {
      console.log(userId);
      if (userId) {
        if ( !isUUIDv4(userId)){
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "userId is invalid (not uuid)" }));
          return
        }

        const user = this.dBHendler.getUserByID(userId); // users.find(u => u.id === userId);
        if (!user) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: `User with id=${userId}  not found` }));
          return
        } 
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
        
      } else {
        const users = this.dBHendler.getAllUsers();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
      }
    }
    else{
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "request to non-existing endpoint" }));
    }
 
  }
}
