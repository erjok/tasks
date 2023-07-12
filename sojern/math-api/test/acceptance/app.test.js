import { should } from "chai";
import request from "supertest";
should();

const apiUri = "http://localhost:3000";

describe("math api", () => {
    it("should return version", (done) => {
        request(apiUri)
            .get("/")
            .expect(200, {
                version: '0.1.0'
            }, done);
    });

    it("should return min numbers", (done) => {
        request(apiUri)
            .get("/min?numbers=3,1,2,5&q=2")
            .expect(200, {
                numbers: [1, 2]
            }, done);
    });

    it("should return max numbers", (done) => {
        request(apiUri)
            .get("/max?numbers=3,1,2,5&q=2")
            .expect(200, {
                numbers: [5, 3]
            }, done);
    });

    it("should return average of numbers", (done) => {
        request(apiUri)
            .get("/avg?numbers=3,1,2,5")
            .expect(200, {
                avg: 2.75
            }, done);
    });

    it("should return median of numbers", (done) => {
        request(apiUri)
            .get("/median?numbers=3,1,2,5")
            .expect(200, {
                median: 2.5
            }, done);
    });

    it("should return qth percentile of numbers", (done) => {
        request(apiUri)
            .get("/percentile?numbers=3,1,2,5&q=75")
            .expect(200, {
                percentile: 3
            }, done);
    });

    it("should return bad request when percentile quanitifer is not in the range 0-100", (done) => {
        request(apiUri)
            .get("/percentile?numbers=3,1,2,5&q=101")
            .expect(400, {
                error: 'Percentile quantifier must be between 0 and 100'
            }, done);
    });
});

