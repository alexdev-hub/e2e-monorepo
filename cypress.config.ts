import {defineConfig} from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    e2e: {
        env: {
            WRITER_API_KEY: process.env.WRITER_API_KEY,
            WRITER_API_BASE_URL: process.env.WRITER_API_BASE_URL,
        },
        setupNodeEvents(on, config) {
            return config;
        },
    },
});
