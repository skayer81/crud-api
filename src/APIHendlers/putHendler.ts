import {DBHendler} from '../DBHendlers/dbHendler'
import http from 'http';

export class PUTHendler{
  //  users = [];
    dBHendler =  new DBHendler()
    

    constructor(){
       // this.PORT = process.env.PORT || 3000;
     //   this.dBHendler =  new DBHendler()
    }

    async getUserData(req: http.IncomingMessage, res: http.ServerResponse, data:string){
        const urlParts = req.url?.split('/');
        const userId = urlParts?.[2];
        if (urlParts?.[1] === 'users' && userId) {
            const userIndex = this.dBHendler.findUserByID();//  users.findIndex(u => u.id === userId);
            if (userIndex === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }

            // let body = '';
            // req.on('data', chunk => {
            //     body += chunk.toString();
            // });

            // req.on('end', () => {
               // const chekData = this.dBHendler.chekValidUserUpdateData(parseData)
                if (this.dBHendler.chekValidUserUpdateData(parseData)){
                    this.dBHendler.uppdateUser(userId, parseData )
                }
             //   const { username, age, hobbies } = JSON.parse(body);
              //  const updatedUser: User = {
                // const updatedUser = {
                //     ...users[userIndex],
                //     username: username !== undefined ? username : users[userIndex].username,
                //     age: age !== undefined ? age : users[userIndex].age,
                //     hobbies: hobbies !== undefined ? hobbies : users[userIndex].hobbies,
                // };
                // users[userIndex] = updatedUser;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
           // });
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid userId format' }));
        }
        // let data = ''
        // req.on("data", (chank) => {
        //     data += chank.toString()
        //   //  console.log(data.toString());
        //   //  users.push()
        // });
        // req.on("end", () => {
        //     console.log(data)
        //     const parseData = JSON.parse(data);  //const parseData
        //   console.log('data', data)
        //   console.log('parse', JSON.parse(data))
        //   const chekUserRes = this.dBHendler.chekValidUser(parseData)
       
        //   if (chekUserRes) {
        //     const newUser = this.dBHendler.addUser(parseData);
        //     res.writeHead(201, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify(newUser));
        //    // res.end('userADD');
        //   }else{
        //     res.writeHead(400, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify({ message: 'Required fields are missing or invalid' }));
        //   }
        //   // res.writeHead(400, { 'Content-Type': 'application/json' });
        //   // res.end(JSON.stringify({ message: 'Required fields are missing or invalid' }));
          
        

        //  // return  parseData
        //   //  res.writeHead(201, { 'Content-Type': 'application/json' });
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
