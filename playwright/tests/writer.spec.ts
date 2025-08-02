import {expect, test} from "@playwright/test";
import {generateText, getApplicationDetails, getApplications, getModels} from "../api";
import {applicationSchema} from "../../schemas/application.schema";

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

test("should fetch the list of models and validate schema", async ({request}) => {
    const response = await getModels(request);
    console.log("Request data:", response);
    const {models} = response;

    expect(Array.isArray(models)).toBe(true)
    expect(models.length).toBeGreaterThan(0);

    const ids = new Set();
    const names = new Set();
    for (const model of models) {
        expect(typeof model.id).toBe('string');
        expect(model.id).not.toBe('');
        expect(typeof model.name).toBe('string');
        expect(model.name).not.toBe('');

        ids.add(model.id);
        names.add(model.name);
    }
    expect(ids.size).toBe(models.length);
});

test("should generate text from prompt", async ({request}) => {
    const requestBody = {
        model: "palmyra-x-003-instruct",
        prompt: "Tell me about WRITER.com",
    };
    const response = await generateText(request, requestBody);
    console.log("Request data:", response);
    const {choices, model} = response;
    expect(Array.isArray(choices)).toBe(true);
    expect(model).toBe(requestBody.model);
});
