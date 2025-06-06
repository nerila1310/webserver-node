import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  // >> Retorna todos los ToDo's
  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then(todos => res.json(todos))
      .catch(error => res.status(400).json({ error }));
  };

  // >> Retorna un toDo basado en el ID
  public getTodoById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    new GetTodo(this.todoRepository)
      .execute(id)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));
  };

  // >> Crea un nuevo ToDo
  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then(newTodo => res.json(newTodo))
      .catch(error => res.status(400).json({ error }));
  };

  // >> Actualiza un toDo basado en el ID
  public updateTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id
    });

    if (error) {
      res.status(400).json({ error });
      return;
    }

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then(updatedTodo => res.json(updatedTodo))
      .catch(error => res.status(400).json({ error }));
  };

  // >> Elimina un toDo basado en el ID
  public deleteTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then(deletedTodo => res.json(deletedTodo))
      .catch(error => res.status(400).json(error));
  };
}
