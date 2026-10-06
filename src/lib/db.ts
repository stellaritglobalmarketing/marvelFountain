import mysql, { type Pool, type RowDataPacket, type ResultSetHeader } from "mysql2/promise";

// One pool per server process; kept on globalThis so dev hot-reloads don't open new pools.
const globalForDb = globalThis as unknown as { mysqlPool?: Pool };

export const pool =
  globalForDb.mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "marvel_fountains",
    charset: "utf8mb4",
    connectionLimit: 10,
    waitForConnections: true,
  });

if (process.env.NODE_ENV !== "production") globalForDb.mysqlPool = pool;

export async function query<T = RowDataPacket>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await pool.query<RowDataPacket[]>(sql, params);
  return rows as T[];
}

export async function execute(sql: string, params: unknown[] = []): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(sql, params);
  return result;
}
