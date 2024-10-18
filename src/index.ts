 import http, { Server } from 'http';
 import { POSTHendler } from './APIHendlers/postHendler';
 //import { POSTHendler } from '../APIHendlers/postHendler.ts';
 import { GETHendler } from './APIHendlers/getHendler';
 //import { GETHendler } from './APIHendlers/getHendler';
//import { GETHendler } from './APIHendlers/getHendler';
//import { PUTHendler } from './APIHendlers/putHendler';
import { DeleteHendler } from './APIHendlers/deleteHendler';
//import POSTHendler from './postHendler/postHendler'

class Application{
   // users = [];
   PORT: number;
   server: Server|null = null;
   postHendler = new POSTHendler()
   //        postHendler = new POSTHendler()
        getHendler = new GETHendler()
        deleteHendler = new DeleteHendler()
       // putHendler = new PUTHendler()
   
    constructor(){
         this.PORT = Number(process.env.PORT) || 3001;
        // this.postHendler = new POSTHendler()
        // this.getHendler = new GETHendler()
        // this.deleteHendler = new DeleteHendler()
        // this.putHendler = new PUTHendler()
      //  this.server = http.createServer(this.requestHandler)
    }

    runApp(){
        console.log('run')
        this.server = http.createServer(async (req, res) =>  {
            let data = ''
            req.on("data", (chank) => {
                data += chank.toString()
            });
            req.on("end", () => {
                console.log(req.method)
                switch (req.method){
                    case 'POST': this.postHendler.getUserData(req, res, data); break;
                     case 'GET': this.getHendler.getUserData(req, res, data); break;
                     case 'DELETE': this.deleteHendler.getUserData(req, res, data); break;
                  //   case 'PUT': const user = this.putHendler.getUserData(req, res, data); break;

                }
            } )

          //  console.log(this.users)
            //       res.writeHead(201, { 'Content-Type': 'application/json' });
     //  res.end('userADD');
        })
        this.server.listen(this.PORT, () => {
            console.log(`Server is running on http://localhost:${this.PORT}`);
        });
    }
}

const app = new Application;
app.runApp()

