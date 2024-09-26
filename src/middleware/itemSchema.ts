import Joi from "joi";

export const itemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  location_id: Joi.number().integer().greater(0).required(),
  quantity: Joi.number().integer().min(1).required(),
});
