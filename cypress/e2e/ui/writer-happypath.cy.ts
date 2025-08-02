import {LoginMetaDataSchema} from "../../../schemas/application.schema";

describe("Writer UI", () => {
    const username = Cypress.env("WRITER_USERNAME")
    const password = Cypress.env("WRITER_PASSWORD")
    before(() => {
        cy.intercept('GET', '/api/user/v2/registration/check**').as('getUserCheck');
        ///api/auth/permission
        cy.intercept('GET', '/api/auth/permission').as('getPermission');
    })
    it('login ', () => {
        cy.uiLogin(username, password);
        cy.wait('@getUserCheck').its('response').then((response) => {
            expect(response.statusCode).to.eq(200);
            LoginMetaDataSchema.parse(response.body);
        });
    });
})