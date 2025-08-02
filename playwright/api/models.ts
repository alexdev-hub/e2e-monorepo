import { APIRequestContext } from "@playwright/test";

const BASE_URL = process.env.WRITER_API_BASE_URL;
const API_KEY = process.env.WRITER_API_KEY;

export async function getModels(request: APIRequestContext) {
  const response = await request.get(`${BASE_URL}/models`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!response.ok())
    throw new Error(`Failed to fetch models: ${response.status()}`);
  return response.json();
}
