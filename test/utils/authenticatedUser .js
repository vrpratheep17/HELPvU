import Server from "../../server/server.js";
import chai from "chai";
let should = chai.should();
import models from "../../models/index";

const userCredentials = {
  mobile_number: "9909090908",
  otp: "3721",
};

let token = null;

let authenticateUser = new Promise((resolve, reject) => {
  models.users
    .upsert({
      mobile_number: userCredentials.mobile_number,
      otp: userCredentials.otp,
    })
    .then((user) => {
      chai
        .request(Server)
        .post("/auth/verifyotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          mobile_number: userCredentials.mobile_number,
          otp: userCredentials.otp,
        })
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res.body);
        });
    });
});

export default authenticateUser;
