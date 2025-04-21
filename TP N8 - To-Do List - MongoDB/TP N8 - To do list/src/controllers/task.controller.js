import { Task } from "../models/task.model.js";

//GET /tasks: Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const { estado, ordenar } = req.query;
    const filtro = estado ? { estado } : {};

    const tasks = await Task.find(filtro)
      .sort(ordenar === "fecha" ? { fechaLimite: 1 } : {})
      .populate("sprint");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tareas", error });
  }
};

//GET /tasks/:id: Obtener una tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("sprint");
    if (!task) return res.status(404).json({ mensaje: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar tarea", error });
  }
};
//POST /tasks: Crear una tarea
export const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear tarea", error });
  }
};
//PUT /tasks/:id: Editar una tarea
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask)
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar tarea", error });
  }
};
//DELETE /tasks/:id: Eliminar una tarea
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ mensaje: "Tarea no encontrada" });

    if (task.sprint) {
      return res.status(400).json({
        mensaje: "No se puede eliminar una tarea asignada a un sprint",
      });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar tarea", error });
  }
};
