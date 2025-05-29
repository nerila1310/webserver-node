import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const toDoController = new TodosController();

    // ? Routes
    router.get("/", toDoController.getTodos);

    return router;
  }
}