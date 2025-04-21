import express from "express";
import bodyParser from "body-parser";

import taskRoutes from "./routes/task.routes.js";
import sprintRoutes from "./routes/sprint.routes.js";
import backlogRoutes from "./routes/backlog.routes.js";

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use("/tasks", taskRoutes);
app.use("/sprints", sprintRoutes);
app.use("/backlog", backlogRoutes);

export default app;
