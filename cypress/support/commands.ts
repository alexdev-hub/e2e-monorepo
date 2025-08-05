Cypress.Commands.add('uiLogin', (email: string, password: string): void => {
  cy.visit('/login')
    .its('window')
    .then((win) => {
      if (win.location.pathname !== '/login') {
        console.log(`Already logged in, current path: ${win.location.pathname}`)
        return
      }
    })

  cy.get('input[type="email"]').type(email, { delay: 0 })
  cy.contains('button', 'Sign in').click()
  cy.get('input[type="password"]', { timeout: 10000 }).type(password, { delay: 0 })
  cy.contains('button[type="submit"]', 'Sign in').click({ force: true })
  cy.get("[class*='_pleaseWaitContainer']").should('be.visible')
})
