import Joi from "joi";
import { validation_helper } from "../utils/validation_helper";

export const send_otp_validator = (req, res, next) => {
  const schema = Joi.object({
    mobile_number: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .label("Mobile number"),
  });
  validation_helper(req, res, next, schema);
};

export const verify_otp_validator = (req, res, next) => {
  const schema = Joi.object({
    mobile_number: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .label("Mobile number"),
    otp: Joi.string()
      .length(4)
      .pattern(/^[0-9]+$/)
      .required()
      .label("OTP"),
  });
  validation_helper(req, res, next, schema);
};
export const refresh_token_validator = (req, res, next) => {
  const schema = Joi.object({
    refresh_token: Joi.string().required().label("Refresh token"),
  });
  validation_helper(req, res, next, schema);
};
