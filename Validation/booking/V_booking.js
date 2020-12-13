import Joi from "joi";
import { validation_helper } from "../utils/validation_helper";

export const book_a_service_validator = (req, res, next) => {
  const schema = Joi.object({
    service_name: Joi.string().required().label("Service name"),
    location: Joi.string().min(10).max(120).required().label("Location"),
    location_type: Joi.string().required().label("Location type"),
  });
  validation_helper(req, res, next, schema);
};

export const get_booking_history_by_id_validator = (req, res, next) => {
  const schema = Joi.object({
    limit: Joi.number().greater(0).required().label("Limit"),
    offset: Joi.number().greater(-1).required().label("Offset"),
  });
  validation_helper(req, res, next, schema);
};

export const get_all_booking_validator = (req, res, next) => {
  const schema = Joi.object({
    limit: Joi.number().greater(0).required().label("Limit"),
    offset: Joi.number().greater(-1).required().label("Offset"),
  });
  validation_helper(req, res, next, schema);
};

export const update_a_booking_validator = (req, res, next) => {
  const schema = Joi.object({
    service_name: Joi.string().required().label("Service name"),
    location: Joi.string().min(10).max(120).required().label("Location"),
    location_type: Joi.string().required().label("Location type"),
  });
  validation_helper(req, res, next, schema);
};
