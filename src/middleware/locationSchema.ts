import Joi from "joi";

export const locationSchema = Joi.object({
  name: Joi.string().required(),
  x: Joi.number().required(),
  y: Joi.number().required(),
});
