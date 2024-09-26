// src/repositories/locationRepository.ts
import { Location } from "../models/v1/locationModel";
import pool from "../config/db";

export const LocationRepository = () => {
  return {
    getAll: async (): Promise<Location[]> => {
      const result = await pool.query("SELECT * FROM locations");
      return result.rows;
    },

    getById: async (id: number): Promise<Location | null> => {
      const result = await pool.query("SELECT * FROM locations WHERE id = $1", [id]);
      return result.rows[0] || null;
    },

    create: async (location: Location): Promise<Location> => {
      const result = await pool.query(
        "INSERT INTO locations (name, x, y) VALUES ($1, $2, $3) RETURNING *",
        [location.name, location.x, location.y]
      );
      return result.rows[0];
    },

    update: async (id: number, location: Location): Promise<Location | null> => {
      const result = await pool.query(
        "UPDATE locations SET name = $1, x = $2, y = $3 WHERE id = $4 RETURNING *",
        [location.name, location.x, location.y, id]
      );
      return result.rows[0] || null;
    },

    delete: async (id: number): Promise<boolean> => {
      const result = await pool.query('DELETE FROM locations WHERE id = $1', [id]);
      return result.rowCount ? result.rowCount > 0 : false;
    },
  };
};