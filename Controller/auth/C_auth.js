import sequelize from "../../config/Database/Postgresql/PGsql";
import models from "../../models/index.js";
import moment from "moment";
import jwt from "jsonwebtoken";
import config from "../../config/index";

//TODO: Integrating otp api
//reason: waiting for 91 to give trail service

export let sent_otp = (req, res) => {
  console.log(req.body);
  try {
    models.users
      .findOrCreate({
        where: {
          mobile_number: req.body.mobile_number,
        },
      })
      .then((user) => {
        let otp = Math.floor(Math.random() * 9000) + 1000;
        console.log(otp);
        models.users
          .update(
            { otp: otp },
            { where: { mobile_number: req.body.mobile_number } }
          )
          .then((success) => {
            res.send({
              error: null,
              data: "OTP has been sent to the given number",
            });
          })
          .catch((err) => {
            res
              .status(500)
              .send({ error: "Unable to access the Database", data: null });
          });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: "Unable to access the Database", data: null });
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let verify_otp = (req, res) => {
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
              // mobile_number: req.body.mobile_number,
              name: user.name,
              id: user.id,
            };

            const access_token = jwt.sign(
              user_data,
              config.Access_token_secret,
              {
                expiresIn: "60m",
              }
            );
            const refresh_token = jwt.sign(
              user_data,
              config.Refresh_token_secret
            );
            models.refresh_token
              .create({ refresh_token: refresh_token })
              .then((suc) => {
                res.send({
                  error: null,
                  data: { access_token, refresh_token },
                });
              });
          } else {
            res.status(400).send({ error: "Incorrect OTP", data: null });
          }
        } else {
          res
            .status(400)
            .send({ error: "Mobile number not registered", data: null });
        }
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let refresh_token = (req, res) => {
  try {
    models.refresh_token
      .findOne({
        where: { refresh_token: req.body.refresh_token },
      })
      .then((token) => {
        if (token) {
          jwt.verify(
            req.body.refresh_token,
            config.Refresh_token_secret,
            function (err, decoded) {
              if (err)
                return res
                  .status(403)
                  .send({ error: "Invalid Token", data: null });
              const access_token = jwt.sign(
                {
                  id: decoded.id,
                  name: decoded.name,
                },
                config.Access_token_secret,
                {
                  expiresIn: "15m",
                }
              );
              res.json({
                error: null,
                data: { access_token, refresh_token: req.body.refresh_token },
              });
            }
          );
        } else {
          res.status(403).send({ error: "Invalid Token", data: null });
        }
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let get_all_users = (req, res) => {
  try {
    models.users
      .findAll({
        include: [
          {
            model: models.user_booking_history,
          },
        ],
      })
      .then((data) => {
        res.json(data);
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};
