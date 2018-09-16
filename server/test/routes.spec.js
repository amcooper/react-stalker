// process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const server = require("../server");
const knex = require("../config/database");

describe("API routes", function() {
  beforeEach("Migrate and seed the test database", async function() {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach("Roll back the database migration", async function() {
    await knex.migrate.rollback();
  });

  after("Drain the database pool", async function() {
    await knex.destroy();
  });

  describe("GET /api/v1/sightings", function() {
    it("should return all sightings", async () => {
      const response = await request(server).get("/api/v1/sightings");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.equal(3);

      expect(response.body[0]).to.be.an("object");
      expect(response.body[0].id).to.be.a("number");
      expect(response.body[0]).to.have.property("celebrity");
      expect(response.body[0].celebrity).to.equal("Rowan Atkinson");
      expect(response.body[0]).to.have.property("stalker");
      expect(response.body[0].stalker).to.equal("Adam Cooper");
      expect(response.body[0]).to.have.property("date");
      expect(response.body[0].date).to.equal(
        new Date("2018-03-21 12:59:59-04").toISOString()
      );
      expect(response.body[0]).to.have.property("location");
      expect(response.body[0].location).to.equal("Brooklyn");
      expect(response.body[0]).to.have.property("comment");
      expect(response.body[0].comment).to.equal("Mr. Bean!");

      expect(response.body[1]).to.be.an("object");
      expect(response.body[1].id).to.be.a("number");
      expect(response.body[1]).to.have.property("celebrity");
      expect(response.body[1].celebrity).to.equal("Allison Janney");
      expect(response.body[1]).to.have.property("stalker");
      expect(response.body[1].stalker).to.equal("Aretha Cooper");
      expect(response.body[1]).to.have.property("date");
      expect(response.body[1].date).to.equal(
        new Date("2018-03-20 12:59:59-04").toISOString()
      );
      expect(response.body[1]).to.have.property("location");
      expect(response.body[1].location).to.equal("Philadelphia");
      expect(response.body[1]).to.have.property("comment");
      expect(response.body[1].comment).to.equal("Congrats.");

      expect(response.body[2]).to.be.an("object");
      expect(response.body[2].id).to.be.a("number");
      expect(response.body[2]).to.have.property("celebrity");
      expect(response.body[2].celebrity).to.equal("Mary J. Blige");
      expect(response.body[2]).to.have.property("stalker");
      expect(response.body[2].stalker).to.equal("Alan Cooper");
      expect(response.body[2]).to.have.property("date");
      expect(response.body[2].date).to.equal(
        new Date("2018-03-02 11:59:59-05").toISOString()
      );
      expect(response.body[2]).to.have.property("location");
      expect(response.body[2].location).to.equal("Baltimore");
      expect(response.body[2]).to.have.property("comment");
      expect(response.body[2].comment).to.equal("Extra foam");
    });
  });

  describe("GET /api/v1/sightings/1", function() {
    it("should return the sighting whose id is 1", async () => {
      const response = await request(server).get("/api/v1/sightings/1");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("object");
      expect(response.body.id).to.be.a("number");
      expect(response.body).to.have.property("celebrity");
      expect(response.body.celebrity).to.equal("Rowan Atkinson");
      expect(response.body).to.have.property("stalker");
      expect(response.body.stalker).to.equal("Adam Cooper");
      expect(response.body).to.have.property("date");
      expect(response.body.date).to.equal(
        new Date("2018-03-21 12:59:59-04").toISOString()
      );
      expect(response.body).to.have.property("location");
      expect(response.body.location).to.equal("Brooklyn");
      expect(response.body).to.have.property("comment");
      expect(response.body.comment).to.equal("Mr. Bean!");
    });
  });

  describe("POST /api/v1/sightings", function() {
    it("should add a new sighting", async () => {
      const postResponse = await request(server)
        .post("/api/v1/sightings")
        .send({
          celebrity: "Zephyr Teachout",
          stalker: "Bing Cherry",
          date: "2018-09-11 13:04:00 -4:00",
          location: "Gun Hill Rd",
          comment: "On fire"
        });
      expect(postResponse.statusCode).to.equal(200);
      const response = await request(server).get("/api/v1/sightings");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.equal(4);
      expect(response.body[3]).to.be.an("object");
      expect(response.body[3]).to.have.property("id");
      expect(response.body[3].id).to.be.a("number");
      expect(response.body[3]).to.have.property("celebrity");
      expect(response.body[3].celebrity).to.equal("Zephyr Teachout");
      expect(response.body[3]).to.have.property("stalker");
      expect(response.body[3].stalker).to.equal("Bing Cherry");
      expect(response.body[3]).to.have.property("date");
      expect(response.body[3].date).to.equal(
        new Date("2018-09-11 13:04:00 -04:00").toISOString()
      );
      expect(response.body[3]).to.have.property("location");
      expect(response.body[3].location).to.equal("Gun Hill Rd");
      expect(response.body[3]).to.have.property("comment");
      expect(response.body[3].comment).to.equal("On fire");
    });

    it("should return an error on an attempt to add bad data", async () => {
      const postResponse = await request(server)
        .post("/api/v1/sightings")
        .send({
          badProperty: "bad data"
        });
      expect(postResponse.statusCode).to.equal(500);
      expect(postResponse.body).to.have.property("error");
    });
  });

  describe("PUT /api/v1/sightings/1", function() {
    it("should change an existing sighting", async () => {
      const putResponse = await request(server)
        .put("/api/v1/sightings/1")
        .send({
          stalker: "The Adam Cooper",
          location: "Canarsie Pier, Brooklyn, New York, USA"
        });
      expect(putResponse.statusCode).to.equal(200);
      const response = await request(server).get("/api/v1/sightings/1");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("stalker");
      expect(response.body.stalker).to.equal("The Adam Cooper");
      expect(response.body).to.have.property("location");
      expect(response.body.location).to.equal(
        "Canarsie Pier, Brooklyn, New York, USA"
      );
      expect(response.body.id).to.be.a("number");
      expect(response.body).to.have.property("celebrity");
      expect(response.body.celebrity).to.equal("Rowan Atkinson");
      expect(response.body).to.have.property("date");
      expect(response.body.date).to.equal(
        new Date("2018-03-21 12:59:59-04").toISOString()
      );
      expect(response.body).to.have.property("comment");
      expect(response.body.comment).to.equal("Mr. Bean!");
    });

    xit("should return an error on an attempt to change the id of an existing sighting", async () => {
      const putResponse = await request(server)
        .put("/api/v1/sightings/1")
        .send({
          id: 99
        });
      expect(putResponse.statusCode).to.equal(500);
      expect(putResponse.body).to.have.property("error");
    });
  });

  describe("DELETE /api/v1/sightings/1", function() {
    it("should remove an existing sighting", async () => {
      const deletedSighting = await request(server).delete(
        "/api/v1/sightings/1"
      );
      expect(deletedSighting.statusCode).to.equal(200);
      expect(deletedSighting.body).to.be.an("array");
      expect(deletedSighting.body.length).to.equal(1);
      const response = await request(server).get("/api/v1/sightings");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.equal(2);
    });
  });
});
