const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
   .min(8)
   .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
   .message('Password must be at least 8 chars, alphanumeric with at least 1 letter and 1 number')
   .required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const verifyEmailSchema = Joi.object({
  token: Joi.string().required()
});

module.exports = { registerSchema, loginSchema, verifyEmailSchema };
