import { LoginMetaDataSchema } from '../../../schemas/application.schema'
import { generateMock } from '@anatine/zod-mock'

describe.only('Writer UI', () => {
  const username = Cypress.env('WRITER_USERNAME')
  const password = Cypress.env('WRITER_PASSWORD')
  const assertLoading = (spinnerPresent: boolean) => {
    const assert = spinnerPresent ? 'be.visible' : 'not.exist'
    cy.get("[class*='_pleaseWaitContainer']").should(assert)
  }

  before(() => {
    const data = generateMock(LoginMetaDataSchema) // can be used for stubCall
    cy.intercept('GET', '/api/user/v2/registration/check**').as('getUserCheck')
    cy.intercept('GET', '/api/auth/permission').as('getPermission')
  })
  it('login ', () => {
    cy.uiLogin(username, password)
    assertLoading(true)
    assertLoading(false)
    cy.wait('@getPermission').its('response.statusCode').should('eq', 200) // Ensure permission check is successful
    cy.get("[class*='_pleaseWaitContainer']").should('not.exist') // Wait for the loading container to disappear
    cy.wait('@getUserCheck')
      .its('response')
      .then((response) => {
        expect(response.statusCode).to.eq(200)
        LoginMetaDataSchema.parse(response.body)
      })
  })
})
