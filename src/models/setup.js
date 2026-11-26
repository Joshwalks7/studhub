import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupDatabase = async () => {
    const schemaPath = path.join(__dirname, "sql", "schema.sql");
    const schema = await fs.readFile(schemaPath, "utf8");

    await db.query(schema);
    console.log("Database schema is ready");
};

export { setupDatabase };
