import { v4 as uuidv4 } from 'uuid';

export class DBHendler{
      users = [];

      constructor() {
        if (DBHendler._instance) {
          return DBHendler._instance;
        }
        DBHendler._instance = this;
    
        this.users = [];
        console.log('---------------------------------------')
      }

      addUser = (user) => {
        user.id = uuidv4(),
        this.users.push(user)
        return user
      }

      getUserByID = (userId) => {
        return this.users.find(user => user.id === userId);
      }

      findUserByID = (userId) => {

      return users.findIndex(u => u.id === userId)
    }

      getAllUsers = () => {
        return this.users
      }

      chekValidUser = (userData) => {
        const { username, age, hobbies } = userData;
        //const 
        if (!username || typeof username !== 'string' || !age ||  isNaN(Number(age))   || !Array.isArray(hobbies)) {
            return false
        } 
        return true
      }

      delUserByID = (userId) => {
        const index = this.findUserByID(userId)
        if (index != -1) this.users.splice(index, 1);
      }


}

    //   constructor(){
    //       this.PORT = process.env.PORT || 3000;
    //   }


  
//       async getUserData(req){
//           let data = ''
//           req.on("data", (chank) => {
//               data += chank.toString()
//             //  console.log(data.toString());
//             //  users.push()
//           });
//           req.on("end", () => {
//               console.log(data)
//             //  console.log(JSON.parse(data))
            
//             const parseData = JSON.parse(data);
//             return  parseData
//             //  res.writeHead(201, { 'Content-Type': 'application/json' });
//           })
  
//          // res.writeHead(201, { 'Content-Type': 'application/json' });
//          // res.end('userADD');
//           // res.end(JSON.stringify(newUser));
//       }
//   }    
  
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
  