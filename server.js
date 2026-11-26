import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/controllers/routes.js";
import { testConnection } from "./src/models/db.js";
import { setupDatabase } from "./src/models/setup.js";
import assets from "./src/middleware/global.js";
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { startSessionCleanup } from './src/utils/session-cleanup.js';
import db from "./src/models/db.js";
// server configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

// setup express server
const app = express();
// Initialize PostgreSQL session store
const pgSession = connectPgSimple(session);

// Configure session middleware
app.use(session({
    store: new pgSession({
        pool: db,
        tableName: 'session',
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: NODE_ENV.includes('dev') !== true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Start automatic session cleanup
startSessionCleanup();

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
const startServer = async () => {
    try {
        await setupDatabase();
        await testConnection();
        console.log("Database connection successful");

        app.listen(PORT, () => {
            console.log(`Server is running on http://127.0.0.1:${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exitCode = 1;
    }
};

startServer();
