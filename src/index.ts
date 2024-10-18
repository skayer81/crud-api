import http, { Server } from "http";
import { POSTHendler } from "./APIHendlers/postHendler";
import { GETHendler } from "./APIHendlers/getHendler";
import { PUTHendler } from "./APIHendlers/putHendler";
import { DeleteHendler } from "./APIHendlers/deleteHendler";

class Application {

    private    PORT: number;

  private server: Server | null = null;

  private postHendler = new POSTHendler();

  //        postHendler = new POSTHendler()
  private getHendler = new GETHendler();

  private deleteHendler = new DeleteHendler();

  private putHendler = new PUTHendler();

  constructor() {
    this.PORT = Number(process.env.PORT) || 3001;
  }

  public runApp():void {
    console.log("run");
    this.server = http.createServer((req, res) => {
      let data = "";
      req.on("data", (chank) => {
        data += String(chank);// .toString();
      });
      req.on("end", () => {
        console.log(req.method);
        switch (req.method) {
          case "POST":
            this.postHendler.getUserData(req, res, data);
            break;
          case "GET":
            this.getHendler.getUserData(req, res);
            break;
          case "DELETE":
            this.deleteHendler.getUserData(req, res);
            break;
          case "PUT":
            this.putHendler.getUserData(req, res, data);
            break;
            default: {
              console.log('ddd')
            }
        }
      });

    });
    this.server.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
}

const app = new Application();
app.runApp();
