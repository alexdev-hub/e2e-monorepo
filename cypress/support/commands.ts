import Writer from "writer-sdk";

Cypress.Commands.add("getWriterModels", () => {
  const client = new Writer({
    apiKey: Cypress.env("WRITER_API_KEY"),
  });

  cy.wrap(client.models.list());
});
