import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  // >> Retorna todos los ToDo's
  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    res.json(todos);
    return;
  };

  // >> Retorna un toDo basado en el ID
  public getTodoById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
      return;
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  // >> Crea un nuevo ToDo
  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    const newTodo = await this.todoRepository.create(createTodoDto!);

    res.json(newTodo);
  };

  // >> Actualiza un toDo basado en el ID
  public updateTodo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id
    });

    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  // >> Elimina un toDo basado en el ID
  public deleteTodo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    try {
      const deletedTodo = await this.todoRepository.deleteById(id);
      res.json(deletedTodo);
      return;
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}
