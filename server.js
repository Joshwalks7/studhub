import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/controllers/routes.js";
import { testConnection } from "./src/models/db.js";
import assets from "./src/middleware/global.js";
// server configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

// setup express server
const app = express();

// configure express
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
// Allow Express to receive and process POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route configuration
app.use(assets);
app.use("/", routes);
/**
 * Start Server
 */
app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log("Database connection successful");
        console.log(`Server is running on http://127.0.0.1:${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
});