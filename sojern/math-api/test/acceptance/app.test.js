import { should } from "chai";
import request from "supertest";
should();

describe("math api", () => {
  it("should return version", async () => {
    const response = await request("http://localhost:3000").get("/");
    response.status.should.equal(200);
    response.get('Content-Type').should.match(/json/);
    response.body.should.have.property("version");
  });
});

