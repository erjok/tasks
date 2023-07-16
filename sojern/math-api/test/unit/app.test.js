import chai, { Assertion } from "chai";
import chaiString from "chai-string";
import request from "supertest";
import app from '../../app.js';

const should = chai.should();
chai.use(chaiString);
Assertion.addMethod("validationError", function(errors) {
    const response = this._obj;

    new Assertion(response.status, "Response status").to.equal(400);
    new Assertion(response.get("Content-Type"), "Response content type").to.startWith("application/problem+json");
    new Assertion(response.body, "Response body").to.deep.equal({
        title: "One or more validation errors occurred.",
        status: 400,
        errors
    });
});

describe("app", () => {
    describe("percentile req validation", () => {
        it("should return bad request when quanitifer is not in the range 0-100", async () => {
            const response = await request(app).get("/percentile?numbers=3,1,2,5&q=101");
            response.should.be.validationError({ q: "Percentile quantifier must be between 0 and 100." });
        });

        it("should return bad request when quanitifer is missing", async () => {
            const response = await request(app).get("/percentile?numbers=3,1,2,5");
            response.should.be.validationError({ q: "Percentile quantifier is required." });
        });

        it("should return bad request when numbers is not a number array", async () => {
            const response = await request(app).get("/percentile?numbers=3,1,2a,5&q=1");
            response.should.be.validationError({ numbers: "Numbers must be a comma-separated list of numbers." });
        });

        it("should return bad request when numbers are missing", async () => {
            const response = await request(app).get("/percentile?q=1");
            response.should.be.validationError({ numbers: "Numbers are required." });
        });
    });

    describe("avg req validation", () => {
        it("should return bad request when avg numbers are missing", async () => {
            const response = await request(app).get("/avg");
            response.should.be.validationError({ numbers: "Numbers are required." });
        });
    });

    describe("median req validation", () => {
        it("should return bad request when median numbers are missing", async () => {
            const response = await request(app).get("/median");
            response.should.be.validationError({ numbers: "Numbers are required." });
        });
    });

    describe("max req validation", () => {
    });

    describe("min req validation", () => {
    });
});

