import { v4 as uuidv4 } from "uuid";

type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

// type InnerUser = {
//   name: string,
//   age: number,
//   hobbies: Array<string>
// }

export class DBHendler {
  // users = [];

  // _instance : DBHendler|null = null;
  private static instance: DBHendler | null = null;

  private users: User[] = [];

  constructor() {
    if (DBHendler.instance) {
      return DBHendler.instance;
    }
    DBHendler.instance = this;

    // this.users = [];
    console.log("---------------------------------------");
  } // Замените `any` на более конкретный тип, если возможно.
  //   private static
  //   _instance: DBHendler | null = null;
  // constructor() {
  //   // Инициализация console.log('---------------------------------------');
  //   if (DBHendler._instance === null) {
  //     DBHendler._instance = new DBHendler();
  //   }
  //   return DBHendler._instance;
  // }

  // public static getInstance(): DBHendler {
  //   if (DBHendler._instance === null) {
  //     DBHendler._instance = new DBHendler();
  //   }
  //   return DBHendler._instance;
  // }

  public addUser = (user: User): User => {
    const addingUser = user;
    addingUser.id = uuidv4();
    this.users.push(user);
    return user;
  };

  public getUserByID = (userId: string): User | undefined =>
    this.users.find((user) => user.id === userId);

  public findUserByID = (userId: string): number =>
    this.users.findIndex((user) => user.id === userId);

  public getAllUsers = (): User[] => this.users;

  public chekValidUserUpdateData = (userData: User): boolean => {
    const { username, age, hobbies } = userData;
    // const
    if (
      (username && typeof username !== "string") ||
      (age && Number.isNaN(age)) ||
      !Array.isArray(hobbies)
    ) {
      return false;
    }
    return true;
  };

  public delUserByID = (userId: string): void => {
    const index = this.findUserByID(userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  };

  public uppdateUser = (userIndex: number, userData: User): void => {
    const { username, age, hobbies } = userData;
    const updatedUser = {
      ...this.users[userIndex],
      username:
        username !== undefined ? username : this.users[userIndex].username,
      age: age !== undefined ? age : this.users[userIndex].age,
      hobbies: hobbies !== undefined ? hobbies : this.users[userIndex].hobbies,
    };
    this.users[userIndex] = updatedUser;
  };
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
