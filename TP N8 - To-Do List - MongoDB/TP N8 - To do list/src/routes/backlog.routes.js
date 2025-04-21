import { Router } from "express";
import {
  getBacklog,
  createBacklogTask,
  addTaskToBacklog,
} from "../controllers/backlog.controller.js";

const router = Router();

router.get("/", getBacklog);
router.post("/", createBacklogTask);
router.put("/add-task/:taskId", addTaskToBacklog);

export default router;
