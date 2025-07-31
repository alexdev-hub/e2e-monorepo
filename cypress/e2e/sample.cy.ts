describe("Cypress Example", () => {
  it("should visit example.com", () => {
    cy.visit("https://example.com");
    cy.contains("Example Domain");
  });
});
