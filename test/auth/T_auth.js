import Server from "../../server/server.js";
import chai from "chai";
import models from "../../models/index";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
let should = chai.should();

export default describe("Auth", () => {
  describe("send OTP", () => {
    it("Error - less than 10 digit mobile number as input", (done) => {
      chai
        .request(Server)
        .post("/auth/sentotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 1 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - greater than 10 digit mobile number as input", (done) => {
      chai
        .request(Server)
        .post("/auth/sentotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 12345678910 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - no mobile_number as input", (done) => {
      chai
        .request(Server)
        .post("/auth/sentotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - passing alphabets as mobile number", (done) => {
      chai
        .request(Server)
        .post("/auth/sentotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: "abcdefg" })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Success - 10 digit mobile number as input", (done) => {
      chai
        .request(Server)
        .post("/auth/sentotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 9590858700 })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    }).timeout(15000);
  });
  describe("verify OTP", () => {
    it("Error - 10 digit mobile number as input and a random otp", (done) => {
      chai
        .request(Server)
        .post("/auth/verifyotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 9597908587, otp: 1234 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - less than 10 digit mobile number as input", (done) => {
      chai
        .request(Server)
        .post("/auth/verifyotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 959790858, otp: 1234 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - greater than 10 digit mobile number as input", (done) => {
      chai
        .request(Server)
        .post("/auth/verifyotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 95979085879, otp: 1234 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - no mobile_number as input", (done) => {
      chai
        .request(Server)
        .post("/auth/verifyotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 95979085879, otp: 1234 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - 10 digit mobile number as input and  without otp", (done) => {
      chai
        .request(Server)
        .post("/auth/verifyotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 95979085879 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - 10 digit mobile number as input and  3 digit otp", (done) => {
      chai
        .request(Server)
        .post("/auth/verifyotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 95979085879, otp: 123 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - 10 digit mobile number as input and  5 digit otp", (done) => {
      chai
        .request(Server)
        .post("/auth/verifyotp")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ mobile_number: 95979085879, otp: 12345 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Refresh Token", () => {
    it("Error - Without refreshtoken", (done) => {
      chai
        .request(Server)
        .post("/auth/refreshtoken")
        .set("content-type", "application/x-www-form-urlencoded")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - Invalid refreshtoken", (done) => {
      chai
        .request(Server)
        .post("/auth/refreshtoken")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ refresh_token: "refreshtoken " })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});
