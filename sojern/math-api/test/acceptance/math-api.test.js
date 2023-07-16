import { should } from "chai";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config();
should();

const apiUri = process.env.TEST_API_URI;

describe("math api", () => {
    it("should return version", (done) => {
        request(apiUri)
            .get("/")
            .expect(200, {
                version: '1.0.0'
            }, done);
    });

    it("should return min numbers", (done) => {
        request(apiUri)
            .get("/min/3,1.3,2,5?q=2")
            .expect(200, {
                minNumbers: [1.3, 2]
            }, done);
    });

    it("should return max numbers", (done) => {
        request(apiUri)
            .get("/max/3.5,1,2,5?q=2")
            .expect(200, {
                maxNumbers: [5, 3.5]
            }, done);
    });

    it("should return average of numbers", (done) => {
        request(apiUri)
            .get("/avg/3,1,2,5.0")
            .expect(200, {
                avg: 2.75
            }, done);
    });

    it("should return median of numbers", (done) => {
        request(apiUri)
            .get("/median/3,1,2,5")
            .expect(200, {
                median: 2.5
            }, done);
    });

    it("should return qth percentile of numbers", (done) => {
        request(apiUri)
            .get("/percentile/75/3,1,2,5")
            .expect(200, {
                percentile: 3
            }, done);
    });

    it("should return bad request with problem details when validation error occurs", (done) => {
        request(apiUri)
            .get("/percentile/1/foo")
            .expect("Content-Type", /problem\+json/)
            .expect(400, {
                title: "One or more validation errors occurred.",
                status: 400,
                errors: {
                    numbers : "Numbers must be a comma-separated list of numbers."
                }
            }, done);
    });
});

