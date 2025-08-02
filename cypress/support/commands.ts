Cypress.Commands.add(
    "uiLogin",
    (email: string, password: string): void => {
        console.log(`Logging in with email: ${email} and password: ${password}`);
        cy.visit("/login").its('window').then((win) => {
            console.log(win);
            if (win.location.pathname !== '/login') {
                console.log(`Already logged in, current path: ${win.location.pathname}`);
                return;
            }
        });

        cy.get('input[type="email"]').type(email, {force: true});
        cy.contains("button", 'Sign in').click();
        cy.get('input[type="password"]', {timeout: 5000}).type(password);
        cy.contains("button", 'Sign in').click();
    }
)