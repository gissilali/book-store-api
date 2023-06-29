import Joi from "joi";

export const loginRequestValidator = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
