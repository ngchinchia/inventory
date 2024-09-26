import fs from "fs";
import path from "path";
import pool from "../config/db";

const runSqlScript = async (filePath: string): Promise<void> => {
  const sql = fs.readFileSync(filePath, "utf8");

  try {
    await pool.query(sql);
    console.log("SQL script executed successfully");
  } catch (error) {
    console.error("Error executing SQL script:", error);
  }
};

const main = async () => {
  const sqlFilePath = path.join(__dirname, "insert_table.sql");
  await runSqlScript(sqlFilePath);
};

main()
  .then(() => {
    pool.end();
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error in main:", error);
    pool.end();
    process.exit(1);
  });
