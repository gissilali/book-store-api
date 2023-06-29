import Joi from "joi";

export const createBookRequest = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  coverImage: Joi.string().uri().required(),
  price: Joi.number().required(),
});
