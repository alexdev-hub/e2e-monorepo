import {defineConfig} from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    e2e: {
        env: {
            WRITER_API_KEY: process.env.WRITER_API_KEY,
            baseUrl: "https://api.writer.com/v1",
        },
        setupNodeEvents(on, config) {
            return config;
        },
    },
});
