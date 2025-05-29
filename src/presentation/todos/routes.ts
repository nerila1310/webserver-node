import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const toDoController = new TodosController();

    // ? Routes
    router.get("/:id", toDoController.getTodoById);
    router.get("/", toDoController.getTodos);
    router.post("/", toDoController.createTodo);

    return router;
  }
}
