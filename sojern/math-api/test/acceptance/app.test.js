import { should } from "chai";
import request from "supertest";
should();

describe("app", () => {
  it("should return 200", async () => {
    const response = await request("http://localhost:3000/").get("/");
    response.status.should.equal(200)
  });
});

