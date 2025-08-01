describe("Writer SDK basic API test", () => {
  it("fetches models via API request", () => {
    cy.request({
      method: "GET",
      url: "https://api.writer.com/v1/models",
      headers: {
        Authorization: `Bearer ${Cypress.env("WRITER_API_KEY")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("models");
    });
  });

  // it("should fetch models successfully", () => {
  //     cy.getWriterModels().then((models) => {
  //         cy.log("Models:", JSON.stringify(models));
  //         expect(models).to.exist;
  //         expect(Array.isArray(models)).to.be.true;
  //     });
  // });
});
