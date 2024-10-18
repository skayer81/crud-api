import http from 'http';
import { POSTHendler } from './APIHendlers/postHendler.js';
import { GETHendler } from './APIHendlers/getHendler.js';
//import POSTHendler from './postHendler/postHendler'

class Application{
    users = [];
    constructor(){
        this.PORT = process.env.PORT || 3000;
        this.postHendler = new POSTHendler()
        this.getHendler = new GETHendler()
    }

    runApp(){
        this.server = http.createServer(async (req, res) =>  {
            let data = ''
            req.on("data", (chank) => {
                data += chank.toString()
            });
            req.on("end", () => {
                if (req.method = 'POST') {
                    const user = this.postHendler.getUserData(req, res, data)
                    //this.users.push(user)
                }
                if (req.method = 'GET') {
                    const user = this.getHendler.getUserData(req, res)
                    //this.users.push(user)
                }
                if (req.method = 'DELETE') {
                    const user = this.deleteHendler.getUserData(req, res)
                    //this.users.push(user)
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
// const users = [];
// const server = http.createServer((req, res) => {
//     if (req.method = 'POST') {
//         console.log('---------------')
//         let data = ''
//         req.on("data", (chank) => {
//             data += chank.toString()
//           //  console.log(data.toString());
//           //  users.push()
//         });
//         req.on("end", () => {
//             users.push(JSON.parse(data));
//           //  res.writeHead(201, { 'Content-Type': 'application/json' });
//         })
//         res.writeHead(201, { 'Content-Type': 'application/json' });
//         res.end('userADD');
//         // res.end(JSON.stringify(newUser));
//     }
//     console.log(users)
// });
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
