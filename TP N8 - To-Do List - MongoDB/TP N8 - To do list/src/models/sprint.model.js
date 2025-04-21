import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema({
  nombre: String,
  fechaInicio: Date,
  fechaCierre: Date,
  color: String,
  tareas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export const Sprint = mongoose.model("Sprint", sprintSchema);
