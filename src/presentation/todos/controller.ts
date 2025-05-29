import { Request, Response } from "express";

export class TodosController {
  public getTodos = (req: Request, res: Response) => {
    res.json([
      {
        id: 1,
        title: "Learn Node.js",
        completed: false,
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Build a REST API",
        completed: true,
        createdAt: null
      },
      {
        id: 3,
        title: "Deploy to Heroku",
        completed: false,
        createdAt: new Date()
      }
    ]);
  };
}
