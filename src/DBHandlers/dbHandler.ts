import { v4 as uuidv4 } from "uuid";
import { User, PartialUser } from "src/types";

export class DBHandler {

  private static instance: DBHandler | null = null;

  private users: User[] = [];

  constructor() {
    if (DBHandler.instance) {
      // eslint-disable-next-line no-constructor-return
      return DBHandler.instance;
    }
    DBHandler.instance = this;

  } 

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

  public delUserByID = (userId: string): void => {
    const index = this.findUserByID(userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  };

  public uppdateUser = (userID: string, userData: PartialUser): User => {
    const userIndex = this.findUserByID(userID)
    const { username, age, hobbies } = userData;
    const updatedUser = {
      ...this.users[userIndex],
      username:
        username !== undefined ? username : this.users[userIndex].username,
      age: age !== undefined ? age : this.users[userIndex].age,
      hobbies: hobbies !== undefined ? hobbies : this.users[userIndex].hobbies,
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  };
}
