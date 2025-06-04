import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  // >> Retorna todos los ToDo's
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({
      orderBy: { id: "asc" }
    });

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

    const todo = await prisma.todo.findFirst({
      where: { id }
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });

    return;
  };

  // >> Crea un nuevo ToDo
  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    res.json(todo);
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

    const todo = await prisma.todo.findFirst({
      where: { id }
    });

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
      return;
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values
    });

    res.json(updatedTodo);
  };

  // >> Elimina un toDo basado en el ID
  public deleteTodo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const todo = await prisma.todo.findFirst({
      where: { id }
    });

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found` });
      return;
    }

    const deletedTodo = await prisma.todo.delete({
      where: { id }
    });

    deletedTodo
      ? res.json(deletedTodo)
      : res
          .status(400)
          .json({ error: `Todo with id ${id} could not be deleted` });
  };
}
