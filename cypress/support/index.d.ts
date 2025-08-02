declare namespace Cypress {
    interface Chainable {
        // API Commands
        /**
         * Fetches the list of applications.
         * @returns {Promise<Application[]>} The list of applications.
         */
        getApplications(): Chainable<Application[]>;

        /**
         * Fetches details of a specific application by its ID.
         * @param {string}
         * applicationId - The ID of the application to fetch.
         * @return {Promise<Application>} The details of the specified application.
         * */
        getApplicationDetails(applicationId: string): Chainable<Application>;

        /**
         * Fetches the list of models.
         * @returns {Promise<Model[]>} The list of models.
         */
        getModels(): Chainable<Model[]>;

        /**
         * Generates text based on the provided body.
         * @param {any}
         * body - The body of the request to generate text.
         * @return {Promise<{ text: string; metadata: Record<string, any> }>} The generated text and metadata.
         * */
        generateText(
            body: Record<key, value>
        ): Chainable<{
            choices: Array<{
                text: string;
                log_probs: any;
            }>;
            model: string;
        }>;

        // UI Commands
        /**
         * Logs in a user with the provided email and password.
         * @param {string}
         * email - The email of the user.
         * @param {string}
         * password - The password of the user.
         * @return {Chainable<void>} A chainable that resolves when the login is complete.
         */
        uiLogin(email: string, password: string): Chainable<any>;

        // Session Storage Commands
        /**
         * Gets an item from the local storage.
         * @param {string}
         * key - The key of the item to retrieve.
         * @return {Chainable<string>} A chainable that resolves to the value of the item.
         * */
        setSessionStorage(key: string, value: string): Chainable<void>;

        /**
         * Gets an item from the session storage.
         * @param {string}
         * key - The key of the item to retrieve.
         * @return {Chainable<string>} A chainable that resolves to the value of the item.
         */
        getSessionStorage(key: string): Chainable<string>;

        /**
         * Clears the session storage.
         * @returns {Chainable<void>} A chainable that resolves when the session storage is cleared.
         */
        clearSessionStorage(): Chainable<void>;
    }
}
