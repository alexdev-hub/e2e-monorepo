const BASE_HEADERS = {
    Authorization: `Bearer ${Cypress.env("WRITER_API_KEY")}`,
    "Content-Type": "application/json",
};

const BASE_URL = Cypress.env("WRITER_API_BASE_URL");

Cypress.Commands.add("getApplications", (): Cypress.Chainable<any> => {
    return cy
        .request({
            method: "GET",
            url: `${BASE_URL}/applications`,
            headers: {...BASE_HEADERS},
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            return cy.wrap(response.body);
        });
});

Cypress.Commands.add(
    "getApplicationDetails",
    (applicationId: string): Cypress.Chainable<any> => {
        return cy
            .request({
                method: "GET",
                url: `${BASE_URL}/applications/${applicationId}`,
                headers: {...BASE_HEADERS},
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                return cy.wrap(response.body);
            });
    },
);

Cypress.Commands.add("getModels", () => {
    return cy
        .request({
            method: "GET",
            url: `${BASE_URL}/models`,
            headers: {...BASE_HEADERS},
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            return response.body.models;
        });
});

Cypress.Commands.add("generateText", (body: any) => {
    return cy
        .request({
            method: "POST",
            url: "https://api.writer.com/v1/completions", // why
            headers: {...BASE_HEADERS},
            body: {...body},
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            return response.body;
        });
});

Cypress.Commands.add("setSessionStorage", (key: string, value: string) => {
    cy.window().then((win) => {
        win.sessionStorage.setItem(key, value);
    });
});

Cypress.Commands.add(
    "getSessionStorage",
    (key: string): Cypress.Chainable<string> => {
        return cy.window().then((win) => {
            const value = win.sessionStorage.getItem(key);
            return value ?? "";
        });
    },
);

Cypress.Commands.add("clearSessionStorage", () => {
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
});
