import sequelize from "../../config/db.js";
import models from "../../models/index.js";
import moment from "moment";
import jwt from "jsonwebtoken";
import config from "../../config/index";

//TODO: Integrating otp api
//reason: waiting for 91 to give trail service

export let signup = (req, res) => {
  try {
    models.users
      .findAll({
        where: {
          mobile_number: req.body.mobile_number,
        },
      })
      .then(async (user) => {
        if (user.length > 0) {
          res.status(409).send({
            error: "Mobile number already registered",
            data: null,
          });
        } else {
          let newUser = {
            mobile_number: parseInt(req.body.mobile_number),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            otp: Math.floor(Math.random() * 9000) + 1000,
          };
          console.log(newUser);
          models.users.create(newUser).then((data) => {
            //! write otp api here
            res.send({
              error: null,
              data: "Otp has been send to User mobile number",
            });
          });
        }
      }).catch(err=>{
        res.status(500).send({ error: "Can't access database", data: null });
      })
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let signup_otp_verification = (req, res) => {
  try {
    models.users
      .findOne({
        where: {
          mobile_number: req.body.mobile_number,
        },
      })
      .then((user) => {
        if (user) {
          var todayDate = moment.utc();
          var otpExpiry = moment(user.updated_at);

          if (todayDate.diff(otpExpiry, "minutes") > 30) {
            res.status(400).send({ error: "OTP expired", data: null });
          } else if (parseInt(req.body.otp) === user.otp) {
            let user_data = {
              mobile_number: req.body.mobile_number,
              name: user.phone_number,
            };

            const access_token = jwt.sign(
              user_data,
              config.Access_token_secret,
              {
                expiresIn: "15m",
              }
            );
            const refresh_token = jwt.sign(
              user_data,
              config.Refresh_token_secret
            );
            res.send({ error: null, data: { access_token, refresh_token } });
          } else {
            res.status(400).send({ error: "Incorrect OTP", data: null });
          }
        } else {
          res
            .status(400)
            .send({ error: "Mobile number not registered", data: null });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ error: "Can't access database", data: null });
      });
  } catch (err) {
    res.status(500).send({ error: "something broke", data: null });
  }
};

//TODO: Integrating otp api
//reason: waiting for 91 to give trail service

export let login = async (req, res) => {
  try {
    models.users
      .findOne({
        where: {
          mobile_number: req.body.mobile_number,
        },
      })
      .then((user) => {
        if (user) {
          //send otp here
          res.send({
            error: null,
            data: "Otp has been send to User mobile number ",
          });
        } else {
          res
            .status(400)
            .send({ error: "Mobile Number not registered", data: null });
        }
      })
      .catch((err) => {
        res.status(500).send({ error: "Can't access database", data: null });
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let login_otp_verfication = (req, res) => {
  try {
    models.users
      .findOne({
        where: {
          mobile_number: req.body.mobile_number,
          user_status:true
        },
      })
      .then((user) => {
        if (user) {
          var todayDate = moment.utc();
          var otpExpiry = moment(user.updated_at);

          if (todayDate.diff(otpExpiry, "minutes") > 30) {
            res.status(400).send({ error: "OTP expired", data: null });
          } else if (parseInt(req.body.otp) === user.otp) {
            let user_data = {
              mobile_number: req.body.mobile_number,
              name: user.phone_number,
            };
            const access_token = jwt.sign(user_data, config.Access_token_secret, {
              expiresIn: "15m",
            });
            const refresh_token = jwt.sign(user_data, config.Refresh_token_secret);
            res.send({ error: null, data: { access_token, refresh_token } });
          } else {
            res.status(400).send({ error: "Incorrect OTP", data: null });
          }
        } else {
          res
            .status(400)
            .send({ error: "Mobile Number not registered", data: null });
        }
      })
      .catch((err) => {
        res.status(500).send({ error: "Can't access database", data: null });
      });
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: "something broke", data: null });
  }
};
