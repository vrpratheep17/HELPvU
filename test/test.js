import Server from "../server/server.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
let should = chai.should();

describe("Testing test api", () => {
  describe("GET API", () => {
    it("it should GET status 200", (done) => {
      chai
        .request(Server)
        .get("/auth/test")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("POST API", () => {
    it("it should GET status 200", (done) => {
      chai
        .request(Server)
        .post("/auth/test")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
