import {DBHendler} from './../DBHendlers/dbHendler.js'

export class POSTHendler{
  //  users = [];
    constructor(){
        this.PORT = process.env.PORT || 3000;
        this.dBHendler =  new DBHendler()
    }

    async getUserData(req, res, data){
        // let data = ''
        // req.on("data", (chank) => {
        //     data += chank.toString()
        //   //  console.log(data.toString());
        //   //  users.push()
        // });
      //  req.on("end", () => {
            console.log(data)
            const parseData = JSON.parse(data);  //const parseData
        //  console.log('data', data)
         // console.log('parse', JSON.parse(data))
          const chekUserRes = this.dBHendler.chekValidUser(parseData)
       
          if (chekUserRes) {
            const newUser = this.dBHendler.addUser(parseData);
            res.writeHead(202, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
           // res.end('userADD');
          }else{
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Required fields are missing or invalid' }));
          }
          // res.writeHead(400, { 'Content-Type': 'application/json' });
          // res.end(JSON.stringify({ message: 'Required fields are missing or invalid' }));
          
        

         // return  parseData
          //  res.writeHead(201, { 'Content-Type': 'application/json' });
       // })

       // res.writeHead(201, { 'Content-Type': 'application/json' });
       // res.end('userADD');
        // res.end(JSON.stringify(newUser));
    }
}    

//     runApp(){
//         this.server = http.createServer((req, res) => {

//         })
//         server.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     }
// }
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
