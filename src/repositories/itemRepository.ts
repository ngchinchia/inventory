import { Item } from "../models/v1/itemModel";
import pool from "../config/db";

export const ItemRepository = () => {
  return {
    getAll: async (): Promise<Item[]> => {
      const result = await pool.query("SELECT * FROM items");
      return result.rows;
    },

    getById: async (id: number): Promise<Item | null> => {
      const result = await pool.query("SELECT * FROM items WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    },

    create: async (item: Item): Promise<Item> => {
      const result = await pool.query(
        "INSERT INTO items (name, description, location_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
        [item.name, item.description, item.location_id, item.quantity]
      );
      return result.rows[0];
    },

    update: async (id: number, item: Item): Promise<Item | null> => {
      const result = await pool.query(
        "UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *",
        [item.name, item.description, id]
      );
      return result.rows[0] || null;
    },

    delete: async (id: number): Promise<boolean> => {
      const result = await pool.query('DELETE FROM items WHERE id = $1', [id]);
      return result.rowCount ? result.rowCount > 0 : false;
    },
  };
};
