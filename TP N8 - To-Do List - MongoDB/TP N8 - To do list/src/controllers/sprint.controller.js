import { Sprint } from "../models/sprint.model.js";
import { Task } from "../models/task.model.js";

//GET /sprints: Obtener todos los sprints
export const getAllSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate("tareas");
    res.json(sprints);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener sprints", error });
  }
};
//GET /sprints/:id: Obtener un sprint por ID
export const getSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate("tareas");
    if (!sprint)
      return res.status(404).json({ mensaje: "Sprint no encontrado" });
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar sprint", error });
  }
};
//POST /sprints: Crear un sprint
export const createSprint = async (req, res) => {
  try {
    const sprint = new Sprint(req.body);
    const savedSprint = await sprint.save();
    res.status(201).json(savedSprint);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear sprint", error });
  }
};
//PUT /sprints/:id: Editar un sprint
export const updateSprint = async (req, res) => {
  try {
    const updatedSprint = await Sprint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSprint)
      return res.status(404).json({ mensaje: "Sprint no encontrado" });
    res.json(updatedSprint);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar sprint", error });
  }
};
//DELETE /sprints/:id: Eliminar un sprint
export const deleteSprint = async (req, res) => {
  try {
    const deleted = await Sprint.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Sprint eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar sprint", error });
  }
};
//PUT /sprints/:id/add-task/:taskId: Agregar una tarea a un sprint
export const addTaskToSprint = async (req, res) => {
  const { id, taskId } = req.params;
  try {
    const sprint = await Sprint.findById(id);
    const task = await Task.findById(taskId);
    //no agregar tarea inexistentes
    if (!sprint || !task)
      //No agregar tarea a un sprint inexistente
      return res.status(404).json({ mensaje: "Sprint o tarea no encontrada" });

    if (!sprint.tareas.includes(taskId)) {
      sprint.tareas.push(taskId);
      await sprint.save();
    }

    task.sprint = sprint._id;
    await task.save();

    res.json({ mensaje: "Tarea agregada al sprint", sprint });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al agregar tarea al sprint", error });
  }
};
