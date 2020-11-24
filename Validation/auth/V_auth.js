import Joi from "joi";

export const signup_validator = Joi.object({
  first_name: Joi.string().alphanum().min(2).max(10).required(),
  last_name: Joi.string().alphanum().min(2).max(10),
  phone_number: Joi.number().integer().required(),
});

export const signup_otp_validator = Joi.object({
  phone_number: Joi.number().integer().required(),
  otp: Joi.number().integer().min(4).max(4).required(),
});

export const login_validator = Joi.object({
  phone_number: Joi.number().integer().required(),
});

export const login_otp_validator = Joi.object({
  phone_number: Joi.number().integer().required(),
  otp: Joi.number().integer().required(),
});
