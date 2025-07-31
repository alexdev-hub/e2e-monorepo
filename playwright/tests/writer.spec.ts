import { expect, test } from "@playwright/test";
import Writer from "writer-sdk";

test("Writer SDK basic API test", async () => {
  const client = new Writer({
    apiKey: process.env.WRITER_API_KEY,
  });

  const response = await client.models.list();

  console.log("Client: =============================", client);
  console.log("Models response:", response);

  expect(response).toBeDefined();
  expect(Array.isArray(response.models)).toBe(true);
  expect(response.models.length).toBeGreaterThan(0);
});
