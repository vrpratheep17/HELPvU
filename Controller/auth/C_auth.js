import sequelize from "../../config/db.js";
import {
  signup_validator,
  signup_otp_validator,
  login_validator,
  login_otp_validator,
} from "../../Validation/auth/V_auth.js";
import { validation_helper } from "../utils/validation_helper.js";

export let signup = async (req, res) => {
  validation_helper(signup_validator, req.body).then(
    function (error) {
      res.status(400).send(error);
    },
    function (value) {
      res.send(value);
    }
  );
};

export let signup_otp_validation = (req, res) => {
  validation_helper(signup_otp_validator, req.body).then(
    function (error) {
      res.status(400).send(error);
    },
    function (value) {
      res.send(value);
    }
  );
};
