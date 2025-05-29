import { Request, Response } from "express";

const todos = [
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
];

export class TodosController {
  // >> Retorna todos los ToDo's
  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
    return;
  };

  // >> Retorna un toDo basado en el ID
  public getTodoById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const todo = todos.find(todo => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });

    return;
  };

  // >> Crea un nuevo ToDo
  public createTodo = (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      createdAt: null
    };

    todos.push(newTodo);

    res.json(newTodo);
  };
}
