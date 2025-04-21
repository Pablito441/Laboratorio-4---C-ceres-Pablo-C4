import { Task } from "../models/task.model.js";

//GET /backlog: Obtener el backlog
export const getBacklog = async (req, res) => {
  try {
    const backlogTasks = await Task.find({ sprint: null });
    res.json(backlogTasks);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el backlog", error });
  }
};
//POST /backlog: Crear backlog (solo uno en este caso)
export const createBacklogTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, sprint: null });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear tarea en backlog", error });
  }
};
//PUT /backlog/add-task/:taskId: Agregar una tarea al backlog
export const addTaskToBacklog = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    //no agregar tarea inexistente al backlog
    if (!task) return res.status(404).json({ mensaje: "Tarea no encontrada" });

    task.sprint = null;
    await task.save();

    res.json({ mensaje: "Tarea agregada al backlog", task });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al mover tarea al backlog", error });
  }
};
