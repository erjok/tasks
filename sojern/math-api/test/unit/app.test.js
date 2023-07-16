import { should } from "chai";
import request from "supertest";
import app from '../../app.js';
should();

describe("app", () => {
    describe("percentile req validation", () => {
        it("should return bad request when quanitifer is not in the range 0-100", (done) => {
            request(app)
                .get("/percentile?numbers=3,1,2,5&q=101")
                .expect("Content-Type", /problem\+json/)
                .expect(400, {
                    title: "One or more validation errors occurred.",
                    status: 400,
                    errors: {
                        q: "Percentile quantifier must be between 0 and 100."
                    }
                }, done);
        });

        it("should return bad request when quanitifer is missing", (done) => {
            request(app)
                .get("/percentile?numbers=3,1,2,5")
                .expect("Content-Type", /problem\+json/)
                .expect(400, {
                    title: "One or more validation errors occurred.",
                    status: 400,
                    errors: {
                        q: "Percentile quantifier is required."
                    }
                }, done);
        });

        it("should return bad request when numbers is not a number array", (done) => {
            request(app)
                .get("/percentile?numbers=3,1,2a,5&q=1")
                .expect("Content-Type", /problem\+json/)
                .expect(400, {
                    title: "One or more validation errors occurred.",
                    status: 400,
                    errors: {
                        numbers: "Numbers must be a comma-separated list of numbers."
                    }
                }, done);
        });

        it("should return bad request when numbers are missing", (done) => {
            request(app)
                .get("/percentile?q=1")
                .expect("Content-Type", /problem\+json/)
                .expect(400, {
                    title: "One or more validation errors occurred.",
                    status: 400,
                    errors: {
                        numbers: "Numbers are required."
                    }
                }, done);
        });
    });

    describe("avg req validation", () => {
        it("should return bad request when avg numbers are missing", (done) => {
            request(app)
                .get("/avg")
                .expect("Content-Type", /problem\+json/)
                .expect(400, {
                    title: "One or more validation errors occurred.",
                    status: 400,
                    errors: {
                        numbers: "Numbers are required."
                    }
                }, done);
        });
    });

    describe("median req validation", () => {
        it("should return bad request when median numbers are missing", (done) => {
            request(app)
                .get("/median")
                .expect("Content-Type", /problem\+json/)
                .expect(400, {
                    title: "One or more validation errors occurred.",
                    status: 400,
                    errors: {
                        numbers: "Numbers are required."
                    }
                }, done);
        });
    });

    describe("max req validation", () => {
    });

    describe("min req validation", () => {
    });
});

