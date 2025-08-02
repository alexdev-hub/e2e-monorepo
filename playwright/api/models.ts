import {APIRequestContext, expect} from "@playwright/test";

const BASE_URL = process.env.WRITER_API_BASE_URL;
const API_KEY = process.env.WRITER_API_KEY;

export async function getModels(request: APIRequestContext) {
    const response = await request.get(`${BASE_URL}/models`, {
        headers: {Authorization: `Bearer ${API_KEY}`},
    });
    expect(response.ok()).toBeTruthy()
    return response.json();
}
