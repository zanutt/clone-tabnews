import database from 'infra/database.js'
import orcherstrator from "tests/orcherstrator.js";

beforeAll(async () => {
  await orcherstrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});


test("GET to /api/v1/mgirations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations")
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
})

