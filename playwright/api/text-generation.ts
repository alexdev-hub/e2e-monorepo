import {APIRequestContext} from "@playwright/test";

const BASE_URL = process.env.WRITER_API_BASE_URL;
const API_KEY = process.env.WRITER_API_KEY;

export async function generateText(
    request: APIRequestContext,
    promptBody: any,
) {
    const response = await request.post(`${BASE_URL}/completions`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        data: {...promptBody},
    });
    const body = await response.json();
    return body.suggestion;
}
