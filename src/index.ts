import 'dotenv/config';
import http, { Server } from "http";
import { POSTHandler } from './APIHandlers/postHandler';
//  import { POSTHandler } from "./APIHandlers/postHandler";
import { GETHandler } from "./APIHandlers/getHandler";
import { PUTHandler } from "./APIHandlers/putHandler";
import { DeleteHandler } from "./APIHandlers/deleteHandler";

export class Application {
  private PORT: number;

  private server: Server | null = null;

  private postHandler = new POSTHandler();

  //        postHandler = new POSTHandler()
  private getHandler = new GETHandler();

  private deleteHandler = new DeleteHandler();

  private putHandler = new PUTHandler();

  constructor() {
    this.PORT = Number(process.env.PORT) || 3001;
  }

  public runApp(): void {
    console.log("run");
    this.server = http.createServer((req, res) => {
      let data = "";
      req.on("data", (chunk) => {
        data += String(chunk); // .toString();
      });
      req.on("end", () => {
        console.log(req.method);
        switch (req.method) {
          case "POST":
            this.postHandler.getUserData(req, res, data);
            break;
          case "GET":
            this.getHandler.getUserData(req, res);
            break;
          case "DELETE":
            this.deleteHandler.getUserData(req, res);
            break;
          case "PUT":
            this.putHandler.getUserData(req, res, data);
            break;
          default: {
            console.log("ddd");
          }
        }
      });
    });
    this.server.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }

  public getServer = (): Server | null => this.server;

  public closeServer = (): void => {
    this.server?.close();
  };
}

export const app = new Application();
app.runApp();
