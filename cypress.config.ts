import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  env: {
    WRITER_API_KEY: process.env.WRITER_API_KEY,
  },
});
