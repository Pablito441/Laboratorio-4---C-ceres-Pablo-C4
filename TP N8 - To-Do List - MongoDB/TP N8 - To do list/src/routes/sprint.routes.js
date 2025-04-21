import { Router } from "express";
import {
  getAllSprints,
  getSprintById,
  createSprint,
  updateSprint,
  deleteSprint,
  addTaskToSprint,
} from "../controllers/sprint.controller.js";

const router = Router();

router.get("/", getAllSprints);
router.get("/:id", getSprintById);
router.post("/", createSprint);
router.put("/:id", updateSprint);
router.delete("/:id", deleteSprint);
router.put("/:id/add-task/:taskId", addTaskToSprint);

export default router;
