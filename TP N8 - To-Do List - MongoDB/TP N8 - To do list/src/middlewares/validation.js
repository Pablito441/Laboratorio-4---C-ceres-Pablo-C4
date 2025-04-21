import { body, validationResult } from "express-validator";

export const validateTask = [
  body("titulo").notEmpty().withMessage("El título es obligatorio"),
  body("fechaLimite")
    .isISO8601()
    .withMessage("La fecha límite debe ser válida"),
  body("estado")
    .optional()
    .isIn(["pendiente", "en progreso", "completada"])
    .withMessage("Estado inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errores: errors.array() });
    next();
  },
];
