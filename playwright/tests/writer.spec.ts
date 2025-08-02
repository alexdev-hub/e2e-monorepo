import {expect, test} from "@playwright/test";
import {generateText, getApplicationDetails, getApplications} from "../api";
import {applicationSchema} from "../../schemas/application.schema";
import Writer from "writer-sdk";

test("assert schema for the first app from the list", async ({request}) => {
    const applications = await getApplications(request);
    expect(Array.isArray(applications.data)).toBe(true);
    const firstAppId = applications.data[0].id;

    const appDetails = await getApplicationDetails(request, firstAppId);
    applicationSchema.parse(appDetails);
    const {id, name, status} = appDetails;

    expect(typeof id).toBe("string");
    expect(id).not.toBe("");
    expect(typeof name).toBe("string");
    expect(name).not.toBe("");
    expect(typeof status).toBe("string");
    expect(status).not.toBe("");

    const result = applicationSchema.safeParse(appDetails);
    expect(result.success).toBe(true);
});

test("generates the text", async ({request}) => {
    const applicationId = "32"; // Заменить на реальный ID приложения
    const promptBody = {
        prompt: "Write me a short SEO article about camping gear",
        model: "palmyra-x-003-instruct",
        max_tokens: 500,
        temperature: 0.7,
    };

    const text = await generateText(request, applicationId, promptBody);
    console.log("Generated content:", text);
});

test("generates text using Writer SDK", async () => {
    const client = new Writer({
        apiKey: process.env.WRITER_API_KEY!,
    });

    const completion = await client.completions.create({
        model: "palmyra-x-003-instruct",
        prompt: "Write me a short SEO article about camping gear",
    });

    console.log("Completion choices:", completion.choices);

    expect(completion.choices).toBeDefined();
    expect(Array.isArray(completion.choices)).toBe(true);
    expect(completion.choices.length).toBeGreaterThan(0);
    expect(typeof completion.choices[0].text).toBe("string");
    expect(completion.choices[0].text.length).toBeGreaterThan(0);
});

test("should generate text from prompt", async ({request}) => {
    const data = {
        model: "palmyra-x-003-instruct",
        prompt: "Write me a short SEO article about camping gear",
    };
    const response = await generateText(request, data);
    console.log("Request data:", response);
    expect(response).toBeDefined();
    expect(typeof response).toBe("object");
});
