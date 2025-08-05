const DEFAULT_HEADERS = {
  Authorization: `Bearer ${Cypress.env('WRITER_API_KEY')}`,
  'Content-Type': 'application/json',
}

Cypress.Commands.add('getApplications', (): Cypress.Chainable<any> => {
  return cy
    .request({
      method: 'GET',
      url: `${Cypress.env('WRITER_API_URL')}/applications`,
      headers: { ...DEFAULT_HEADERS },
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      cy.wrap(response.body.data)
    })
})

Cypress.Commands.add('getApplicationDetails', (applicationId: string): Cypress.Chainable<any> => {
  return cy
    .request({
      method: 'GET',
      url: `${Cypress.env('WRITER_API_URL')}/applications/${applicationId}`,
      headers: { ...DEFAULT_HEADERS },
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      cy.wrap(response.body)
    })
})

Cypress.Commands.add('getModels', () => {
  return cy
    .request({
      method: 'GET',
      url: `${Cypress.env('WRITER_API_URL')}/models`,
      headers: { ...DEFAULT_HEADERS },
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      cy.wrap(response.body.models)
    })
})

Cypress.Commands.add('generateText', (body) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('WRITER_API_URL')}/completions`,
      headers: { ...DEFAULT_HEADERS },
      body: { ...body },
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      cy.wrap(response.body)
    })
})

Cypress.Commands.add('setSessionStorage', (key: string, value: string) => {
  cy.window().then((win) => {
    win.sessionStorage.setItem(key, value)
  })
})

Cypress.Commands.add('getSessionStorage', (key: string): Cypress.Chainable<string> => {
  return cy.window().then((win) => {
    const value = win.sessionStorage.getItem(key)
    return value ?? ''
  })
})

Cypress.Commands.add('clearSessionStorage', () => {
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
})
