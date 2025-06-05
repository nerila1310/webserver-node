import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(dataSource);

    const toDoController = new TodosController(todoRepository);

    // ? Routes
    router.get("/:id", toDoController.getTodoById);
    router.put("/:id", toDoController.updateTodo);
    router.delete("/:id", toDoController.deleteTodo);
    router.get("/", toDoController.getTodos);
    router.post("/", toDoController.createTodo);

    return router;
  }
}
