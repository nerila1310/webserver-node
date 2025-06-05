import { prisma } from "../../data/postgres";
import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDto
} from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  // >> Retorna todos los ToDo's
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany({
      orderBy: { id: "asc" }
    });

    return todos.map(TodoEntity.fromObject);
  }

  // >> Retorna un toDo basado en el ID
  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: { id }
    });

    if (!todo) throw `Todo with id ${id} not found`;
    return TodoEntity.fromObject(todo);
  }

  // >> Crea un nuevo ToDo
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.fromObject(newTodo);
  }

  // >> Actualiza un toDo basado en el ID
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  // >> Elimina un toDo basado en el ID
  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const deletedTodo = await prisma.todo.delete({
      where: { id }
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}
