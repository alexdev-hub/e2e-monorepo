import {applicationSchema} from "../../../schemas/application.schema";

describe("Writer API", () => {
    it("assert schema for the first app from the list", () => {
        cy.getApplications()
            .its("data[0]")
            .then((data) => {
                const {id} = data;
                cy.getApplicationDetails(id).then((app) => {
                    const {id, name, status, inputs} = app;

                    expect(id).to.be.a("string").and.not.be.empty;
                    expect(name).to.be.a("string").and.not.be.empty;
                    expect(status).to.be.a("string").and.not.be.empty;

                    const result = applicationSchema.safeParse(app);
                    expect(result.success).to.be.true;
                });
            });
    });

    it("should fetch the list of models and validate schema", () => {
        const ids = new Set();
        const names = new Set();
        cy.getModels().then((models) => {
            expect(models).to.be.an("array").and.not.be.empty;
            models.forEach((model) => {
                expect(model).to.have.property("id").that.is.a("string").and.not.empty;
                expect(model).to.have.property("name").that.is.a("string").and.not
                    .empty;
                ids.add(model.id);
                names.add(model.name);
            });
            expect(ids.size).to.equal(models.length);
        });
    });

    it("should generate text from prompt", () => {
        const requestBody = {
            model: "palmyra-x-003-instruct",
            prompt: "Tell me about WRITER.com",
        };

        cy.generateText(requestBody).then((body) => {
            const {choices, model} = body;
            expect(choices).to.be.an("array").and.not.be.empty;
            expect(choices[0].text).to.include("WRITER.com");
            expect(model).to.equal(requestBody.model);
        });
    });
});
