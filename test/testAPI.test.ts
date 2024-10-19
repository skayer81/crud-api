import request from "supertest";
import { app } from "../src/index";

describe("GET /api/users", () => {
  const server = app.getServer();
  if (server === null) return;
  afterAll(() => {
    server.close();
  });

  const user = {
    username: "Name Surname",
    age: 69,
    hobbies: ["hobby1", "hobby1"],
    id: "",
  };

  it("I. Get all records with a GET api/users request (an empty array is expected)", async () => {
    const response = await request(server).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("II. A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const response = await request(server).post("/users").send(user);
    const userID = response.body.id;
    user.id = userID;
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(user);
  });

  it("III. With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const response = await request(server).get(`/users/${user.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(user);
  });

  it("V. With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const response = await request(server).delete(`/users/${user.id}`);
    expect(response.statusCode).toBe(204);
  });
  it("VI. With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const response = await request(server).get(`/users/${user.id}`);
    expect(response.statusCode).toBe(404);
  });
});
