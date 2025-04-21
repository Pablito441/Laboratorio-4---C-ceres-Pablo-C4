import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { validateTask } from "../middlewares/validation.js";

const router = Router();

router.get("/", getAllTasks);
// GET /tasks
// GET /tasks?estado=pendiente
// GET /tasks?ordenar=fecha
// GET /tasks?estado=completada&ordenar=fecha
router.get("/:id", getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

export default router;
