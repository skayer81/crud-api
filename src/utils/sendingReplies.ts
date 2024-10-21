import http from "http";

export enum StatusCode {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    NotFound = 404,
    ServerError = 500,
  };

  export enum Message {
    nonExistEndpointMessage = "request to non-existing endpoint",
    nonUUIDMessage = "userId is invalid (not uuid)",
    userNotFoundMessages = "User with this id not found"
  }

  export function nonExistingEndpoint(res : http.ServerResponse ): void{
    res.writeHead(StatusCode.NotFound, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: Message.nonExistEndpointMessage }));
  }

  export function nonUUID(res : http.ServerResponse ): void{
    res.writeHead(StatusCode.BadRequest, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: Message.nonUUIDMessage }));
  }

  export function userNotFound(res : http.ServerResponse ): void{
    res.writeHead(StatusCode.NotFound, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `User with this id not found` }),
    );
  
  }

