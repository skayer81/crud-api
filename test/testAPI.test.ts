import request from "supertest";
import { app } from "../src/index";
import { Message, StatusCode } from "../src/utils/sendingReplies";

type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

describe("test API", () => {
  const server = app.getServer();
  if (server === null) return;
  afterAll(() => {
    server.close();
  });

  let user : User = {
    username: "Name Surname",
    age: 69,
    hobbies: ["hobby1", "hobby1"],
  };

  const endpoint = '/api/users'

  it("I. Get all records with a GET api/users request (an empty array is expected)", async () => {
    const response = await request(server).get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("II. A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const response = await request(server).post(endpoint).send(user);
    const userID = response.body.id;
    user.id = userID;
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(user);
  });

  it("III. With a GET api/users/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const response = await request(server).get(`${endpoint}/${user.id}`)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(user);
  });

  it("IV.   We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id))", async () => {
    const newAge = 50;
    const newHobbies =  ['hobby13'];
    const updatedUser = {
      ...user,
      age: newAge,
      hobbies: newHobbies// !== undefined ? hobbies : this.users[userIndex].hobbies,
    };
    let response = await request(server).put(`${endpoint}/${user.id}`).send({age:newAge, hobbies: newHobbies});;
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedUser);
    response = await request(server).get(`${endpoint}/${user.id}`)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedUser);
  });

  it("V. With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const response = await request(server).delete(`${endpoint}/${user.id}`);
    expect(response.statusCode).toBe(204);
  });
  it("VI. With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const response = await request(server).get(`${endpoint}/${user.id}`);
    expect(response.statusCode).toBe(404);
  });
});

describe("test errors", () => {
  const server = app.getServer();
  if (server === null) return;
  afterAll(() => {
    server.close();
  });

  let user : User = {
    username: "Name Surname",
    age: 69,
    hobbies: ["hobby1", "hobby1"],
  };

  const endpoint = '/api/users'

  it("I. Get: 404 with invalid endpoint", async () => {
    let response = await request(server).get("/wrongenpoit");
    expect(response.status).toBe(StatusCode.NotFound);
    expect(response.text).toEqual(`{\"message\":\"${Message.nonExistEndpointMessage}\"}`);

    response = await request(server).get(`${endpoint}/wrongUserID/blabla`);
    expect(response.status).toBe(StatusCode.NotFound);
    expect(response.text).toEqual(`{\"message\":\"${Message.nonExistEndpointMessage}\"}`);
  });
  it("I. Get: 400 with invalid UserID", async () => {

   let  response = await request(server).get(`${endpoint}/wrongUserID`);
    expect(response.status).toBe(StatusCode.BadRequest);
    expect(response.text).toEqual(`{\"message\":\"${Message.nonUUIDMessage}\"}`);
  });

});
