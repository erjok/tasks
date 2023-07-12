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
            .get("/min?numbers=3,1,2&q=2")
            .expect(200, {
                numbers: [1, 2]
            }, done);
    });
});

