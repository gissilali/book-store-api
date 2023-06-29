import Joi from "joi";

export const registerAuthorRequestValidator = Joi.object().keys({
  name: Joi.string().required(),
  pseudonym: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
