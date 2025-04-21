import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  estado: {
    type: String,
    enum: ["pendiente", "en progreso", "completada"],
    default: "pendiente",
  },
  fechaLimite: Date,
  color: String,
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sprint",
    default: null,
  },
});

export const Task = mongoose.model("Task", taskSchema);
