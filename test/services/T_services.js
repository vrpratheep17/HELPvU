import Server from "../../server/server.js";
import chai from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
import models from "../../models/index";
import RDB from "../../config/Database/Redis/redisDB";

chai.use(chaiHttp);
let should = chai.should();

export default describe("Services", () => {
  describe("Get all Services", () => {
    it("Success - Get all services", (done) => {
      chai
        .request(Server)
        .get("/service/getallservices")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.an("array");
          done();
        });
    });
  });
  describe("Add a service", () => {
    it("Error - without name while adding a service", (done) => {
      chai
        .request(Server)
        .post("/service/addaservice")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          description: faker.commerce.productDescription(),
          image_url: faker.image.imageUrl(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - without description while adding a service", (done) => {
      chai
        .request(Server)
        .post("/service/addaservice")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          name: faker.internet.userName(),
          image_url: faker.image.imageUrl(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - without Image_url while adding a service", (done) => {
      chai
        .request(Server)
        .post("/service/addaservice")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          name: faker.internet.userName,
          description: faker.commerce.productDescription,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Success - Adding a service", (done) => {
      chai
        .request(Server)
        .post("/service/addaservice")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          name: faker.internet.userName(),
          description: faker.commerce.productDescription(),
          image_url: faker.image.imageUrl(),
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("Edit a service", () => {
    it("Error - without name while updating a service", (done) => {
      chai
        .request(Server)
        .put(`/service/editaservice/${Math.round(Math.random() * 10)}`)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          description: faker.commerce.productDescription(),
          image_url: faker.image.imageUrl(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - without description while updating a service", (done) => {
      chai
        .request(Server)
        .put(`/service/editaservice/${Math.round(Math.random() * 10)}`)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          name: faker.internet.userName(),
          image_url: faker.image.imageUrl(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Error - without Image_url while updating a service", (done) => {
      chai
        .request(Server)
        .put(`/service/editaservice/${Math.round(Math.random() * 10)}`)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          name: faker.internet.userName(),
          description: faker.commerce.productDescription(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Success - updating a service", (done) => {
      models.services
        .create({
          name: faker.internet.userName(),
          description: faker.commerce.productDescription(),
          image_url: faker.image.imageUrl(),
        })

        .then((success) => {
          const dataObj = success.get({ plain: true });

          chai
            .request(Server)
            .put(`/service/editaservice/${dataObj.id}`)
            .set("content-type", "application/x-www-form-urlencoded")
            .send({
              name: faker.internet.userName(),
              description: faker.commerce.productDescription(),
              image_url: faker.image.imageUrl(),
            })
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }).timeout(15000);
  });
  describe("Delete a service", () => {
    it("Error - Delete a services with random service", (done) => {
      chai
        .request(Server)
        .delete("/service/deleteaservice/12345")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("Success - Delete a services ", (done) => {
      models.services
        .create({
          name: faker.internet.userName(),
          description: faker.commerce.productDescription(),
          image_url: faker.image.imageUrl(),
        })

        .then((success) => {
          const dataObj = success.get({ plain: true });
          chai
            .request(Server)
            .delete(`/service/deleteaservice/${dataObj.id}`)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    }).timeout(15000);
  });
  describe("Get a service based on id", () => {
    it("Error - Random number for getting service", (done) => {
      chai
        .request(Server)
        .delete("/service/deleteaservice/12345")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("Error - Random number for getting service", (done) => {
      models.services
        .create({
          name: faker.internet.userName(),
          description: faker.commerce.productDescription(),
          image_url: faker.image.imageUrl(),
        })
        .then((success) => {
          const dataObj = success.get({ plain: true });
          chai
            .request(Server)
            .get(`/service/getservicebyid/${dataObj.id}`)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
  });
  describe("Clear Testing datas", () => {
    it("Clear PostgreSQL services", (done) => {
      models.services.destroy({ where: {}, truncate: true }).then((res) => {
        done();
      });
    }).timeout(15000);
  });
});
