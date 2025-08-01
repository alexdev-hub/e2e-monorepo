import Writer from "writer-sdk";

Cypress.Commands.add("getWriterModels", () => {
  const client = new Writer({
    apiKey: Cypress.env("WRITER_API_KEY"),
  });
  console.log(Cypress.env("WRITER_API_KEY"), "Cypress env API key");

  cy.wrap(client.models.list());
});
