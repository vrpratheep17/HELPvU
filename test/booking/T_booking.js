import Server from "../../server/server.js";
import chai from "chai";
import chaiHttp from "chai-http";
import models from "../../models/index";

import faker from "faker";
import authenticateUser from "../utils/authenticatedUser ";

chai.use(chaiHttp);
let token = null;
let should = chai.should();

authenticateUser.then((data) => {
  token = data.data.access_token;
});

export default describe("Bookings", () => {
  describe("Gett all Bookings", () => {
    it("Success - Get all Bookings", (done) => {
      chai
        .request(Server)
        .post("/booking/getallbooking")
        .send({
          limit: 5,
          offset: 0,
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    }).timeout(15000);
    it("Error - Get all services without limit", (done) => {
      chai
        .request(Server)
        .post("/booking/getallbooking")
        .set({ "x-auth-token": token })
        .send({
          offset: 0,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - Get all services without offset", (done) => {
      chai
        .request(Server)
        .post("/booking/getallbooking")
        .set({ "x-auth-token": token })
        .send({
          limit: 5,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Book a service", () => {
    it("Success - Booking a service with token", (done) => {
      chai
        .request(Server)
        .post("/booking/bookaservice")
        .set({ "x-auth-token": token })
        .send({
          service_name: "Cleaning",
          location: faker.address.streetAddress(),
          location_type: "Home",
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("Error - Booking a service without token", (done) => {
      chai
        .request(Server)
        .post("/booking/bookaservice")
        .send({
          service_name: "Cleaning",
          location: faker.address.streetAddress(),
          location_type: "Home",
        })
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });
    it("Error - Booking a service with out service name", (done) => {
      chai
        .request(Server)
        .post("/booking/bookaservice")
        .set({ "x-auth-token": token })
        .send({
          location: faker.address.streetAddress(),
          location_type: "Home",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - Booking a service with out location", (done) => {
      chai
        .request(Server)
        .post("/booking/bookaservice")
        .set({ "x-auth-token": token })
        .send({
          service_name: "Cleaning",
          location_type: "Home",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - Booking a service with out location type", (done) => {
      chai
        .request(Server)
        .post("/booking/bookaservice")
        .set({ "x-auth-token": token })
        .send({
          service_name: "Cleaning",
          location: faker.address.streetAddress(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Get Booking history for a user", () => {
    it("Success - Get all booking history of the user with token", (done) => {
      chai
        .request(Server)
        .post("/booking/getbookinghistorybyid")
        .set({ "x-auth-token": token })
        .send({
          limit: 5,
          offset: 0,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.rows.should.be.an("array");
          done();
        });
    });
    it("Error - Get all booking history of the user without token", (done) => {
      chai
        .request(Server)
        .post("/booking/getbookinghistorybyid")
        .send({
          limit: 5,
          offset: 0,
        })
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });
    it("Error - Get all booking history of the user without limit", (done) => {
      chai
        .request(Server)
        .post("/booking/getbookinghistorybyid")
        .set({ "x-auth-token": token })
        .send({
          offset: 0,
        })
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    });
    it("Error - Get all booking history of the user without offset", (done) => {
      chai
        .request(Server)
        .post("/booking/getbookinghistorybyid")
        .set({ "x-auth-token": token })
        .send({
          limit: 5,
        })
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    });
  });
  describe("Update a booking", () => {
    it("Success - update a service", (done) => {
      models.user_booking_history
        .create({
          service_name: "Car",
          location: faker.address.streetAddress(),
          location_type: "Home",
        })
        .then((success) => {
          let raw = success.get({ plain: true });
          chai
            .request(Server)
            .put(`/booking/updateabookingbyid/${raw.id}`)
            .set({ "x-auth-token": token })
            .send({
              service_name: "Bike",
              location: faker.address.streetAddress(),
              location_type: "Home",
            })
            .end((err, res) => {
              res.should.have.status(200);

              done();
            });
        });
    });
    it("Error - update a booking without service name", (done) => {
      chai
        .request(Server)
        .put(`/booking/updateabookingbyid/12345`)
        .set({ "x-auth-token": token })
        .send({
          location: faker.address.streetAddress(),
          location_type: "Home",
        })
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    });
    it("Error - update a booking without location", (done) => {
      chai
        .request(Server)
        .put(`/booking/updateabookingbyid/12345`)
        .set({ "x-auth-token": token })
        .send({
          service_name: "Cleaning",

          location_type: "Home",
        })
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    });
    it("Error - update a booking without location type", (done) => {
      chai
        .request(Server)
        .put(`/booking/updateabookingbyid/12345`)
        .set({ "x-auth-token": token })
        .send({
          service_name: "Cleaning",
          location: faker.address.streetAddress(),
        })
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    });
  });
  describe("User Booking history model", () => {
    it("Clean Booking history model ", (done) => {
      models.user_booking_history
        .destroy({ where: {}, truncate: true })
        .then((res) => {
          done();
        });
    }).timeout(15000);
  });
});
