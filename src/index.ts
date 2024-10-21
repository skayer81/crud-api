import 'dotenv/config';
import http, { Server } from "http";
import { POSTHandler } from './APIHandlers/postHandler';
import { GETHandler } from "./APIHandlers/getHandler";
import { PUTHandler } from "./APIHandlers/putHandler";
import { DeleteHandler } from "./APIHandlers/deleteHandler";

export class Application {
  private PORT: number;

  private server: Server | null = null;

  private postHandler = new POSTHandler();

  private getHandler = new GETHandler();

  private deleteHandler = new DeleteHandler();

  private putHandler = new PUTHandler();

  constructor() {
    this.PORT = Number(process.env.PORT) || 3001;
  }

  public runApp(): void {
    this.server = http.createServer((req, res) => {
      let data = "";
      req.on("data", (chunk) => {
        data += String(chunk); 
      });
      req.on("end", () => {
        try{
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
            console.log("цкщтп ьуещв")
          }
        }
      }
      catch{
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `Errors on the server side` }));
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
