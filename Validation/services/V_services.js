import Joi from "joi";
import { validation_helper } from "../utils/validation_helper";

export const add_a_service_validator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required().label("Name"),
    description: Joi.string().min(20).max(500).required().label("Description"),
    image_url: Joi.string().uri().required().label("Image url"),
  });
  validation_helper(req, res, next, schema);
};

export const edit_a_service_validator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required().label("Name"),
    description: Joi.string().min(20).max(500).required().label("Description"),
    image_url: Joi.string().uri().required().label("Image url"),
  });
  validation_helper(req, res, next, schema);
};

export const delete_a_service_validator = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .label("Id"),
  });
  validation_helper(req, res, next, schema, "params");
};

export const get_service_by_id_validator = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .label("Id"),
  });
  validation_helper(req, res, next, schema, "params");
};
