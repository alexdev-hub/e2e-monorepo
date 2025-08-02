import {defineConfig} from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    e2e: {
        baseUrl: "https://app.writer.com/",
        env: {
            WRITER_USERNAME: process.env.WRITER_USERNAME,
            WRITER_PASSWORD: process.env.WRITER_PASSWORD,
            WRITER_API_KEY: process.env.WRITER_API_KEY,
            apiUrl: "https://api.writer.com/v1"
        },
        setupNodeEvents(on, config) {
            return config;
        },
    },
});
