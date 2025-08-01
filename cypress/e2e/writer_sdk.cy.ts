import { Writer } from "writer-sdk";

describe("Writer SDK basic API test", () => {
    it("should fetch models successfully", () => {
        cy.getWriterModels().then((models) => {
            cy.log("Models:", JSON.stringify(models));
            expect(models).to.exist;
            expect(Array.isArray(models)).to.be.true;
        });
    });
});

