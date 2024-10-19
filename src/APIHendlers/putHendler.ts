import http from "http";
import { DBHendler } from "../DBHendlers/dbHendler";

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
    if (urlParts?.[1] === "users" && userId) {
      const userIndex = this.dBHendler.findUserByID(userId); //  users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }
      const parseData = JSON.parse(String(data));

      // let body = '';
      // req.on('data', chunk => {
      //     body += chunk.toString();
      // });

      // req.on('end', () => {
      // const chekData = this.dBHendler.chekValidUserUpdateData(parseData)
      if (this.dBHendler.chekValidUserUpdateData(parseData)) {
        this.dBHendler.uppdateUser(userIndex, parseData);
      }

      // };
      // users[userIndex] = updatedUser;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify("ddddd"));
      // });
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid userId format" }));
    }
  }
}
