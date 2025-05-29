import { Request, Response } from "express";

const todos = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
    completedAt: new Date()
  },
  {
    id: 2,
    title: "Build a REST API",
    completed: true,
    completedAt: null
  },
  {
    id: 3,
    title: "Deploy to Heroku",
    completed: false,
    completedAt: new Date()
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
      completedAt: null
    };

    todos.push(newTodo);

    res.json(newTodo);
  };

  // >> Actualiza un toDo basado en el ID
  public updateTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
      return;
    }

    const { title, completed } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    } else todo.title = title;

    if (!completed) {
      res.status(400).json({ error: "Complete is required" });
      return;
    } else todo.completed = Boolean(completed);

    res.json(todo);
  };
}
