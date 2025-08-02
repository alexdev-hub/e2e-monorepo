import {APIRequestContext, expect} from "@playwright/test";

const BASE_URL = process.env.WRITER_API_BASE_URL;
const API_KEY = process.env.WRITER_API_KEY;

export async function generateText(
    request: APIRequestContext,
    promptBody: any,
) {
    const response = await request.post(`${BASE_URL}/completions`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
        data: {...promptBody},
    });
    expect(response.ok()).toBeTruthy()
    return response.json();
}
