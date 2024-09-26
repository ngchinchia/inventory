import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});


pool.connect((error) => {
  if (error) return console.error('[database-pool]:', error.message)
  console.log("[database-pool]: Connect to PostgreSQL successfully")
})



export default pool;
