import { APIRequestContext } from "@playwright/test";

const BASE_URL = process.env.WRITER_API_BASE_URL;
const API_KEY = process.env.WRITER_API_KEY;

export async function getApplications(request: APIRequestContext) {
  const response = await request.get(`${BASE_URL}/applications`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!response.ok())
    throw new Error(`Failed to fetch applications: ${response.status()}`);
  return response.json();
}

export async function getApplicationDetails(
  request: APIRequestContext,
  applicationId: string,
) {
  const response = await request.get(
    `${BASE_URL}/applications/${applicationId}`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  );
  if (!response.ok())
    throw new Error(
      `Failed to fetch application details: ${response.status()}`,
    );
  return response.json();
}
