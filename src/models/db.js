import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error);
});

const testConnection = async () => {
    const result = await pool.query("SELECT NOW() AS current_time");
    return result.rows[0].current_time;
};

export { testConnection };
export default pool;