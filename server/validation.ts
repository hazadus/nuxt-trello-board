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

export const BoardValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  columns: Joi.array().required(),
});

export const UserValidationSchema = Joi.object({
  firstName: Joi.string().min(1),
  lastName: Joi.string().min(1),
  email: Joi.string().email().required(),
  plainPassword: Joi.string().min(8).required(),
});

export const LoginCredentialsValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  plainPassword: Joi.string().min(8).required(),
});
