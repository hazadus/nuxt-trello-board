import Joi from "joi";

export const TaskValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  details: Joi.string(),
  isCompleted: Joi.boolean().required(),
  isFavorite: Joi.boolean().required(),
  completedAt: Joi.date(),
});

export const ColumnValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  tasks: Joi.array().required(),
});
