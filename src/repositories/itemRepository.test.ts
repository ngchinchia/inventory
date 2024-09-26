import { ItemRepository } from "./itemRepository";
import pool from "../config/db";
import { Item } from "../models/v1/itemModel";

// Mock the pool.query method
jest.mock('../config/db', () => ({
    query: jest.fn(),
  }));
  

describe("ItemRepository", () => {
  const repository = ItemRepository();

  it("should get all items", async () => {
    // Mock the return value of pool.query for getAll
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, name: "Item 1", description: "Description 1", location_id: 1, quantity: 10 }],
    });

    const items = await repository.getAll();
    expect(items).toEqual([{ id: 1, name: "Item 1", description: "Description 1", location_id: 1, quantity: 10 }]);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM items");
  });

  it("should get an item by ID", async () => {
    const mockItem = { id: 1, name: "Item 1", description: "Description 1", location_id: 1, quantity: 10 };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockItem] });

    const item = await repository.getById(1);
    expect(item).toEqual(mockItem);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM items WHERE id = $1", [1]);
  });

  it("should return null if item not found", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const item = await repository.getById(1);
    expect(item).toBeNull();
  });

  it("should create a new item", async () => {
    const newItem: Item = { name: "Item 1", description: "Description 1", location_id: 1, quantity: 10 };
    const createdItem = { id: 1, ...newItem };
    
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [createdItem] });

    const result = await repository.create(newItem);
    expect(result).toEqual(createdItem);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO items (name, description, location_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
      [newItem.name, newItem.description, newItem.location_id, newItem.quantity]
    );
  });

  it("should update an existing item", async () => {
    const updatedItem: Item = { name: "Updated Item", description: "Updated Description", location_id: 1, quantity: 10 };
    const resultItem = { id: 1, ...updatedItem };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [resultItem] });

    const item = await repository.update(1, updatedItem);
    expect(item).toEqual(resultItem);
    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [updatedItem.name, updatedItem.description, 1]
    );
  });

  it("should return null if item to update is not found", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const item = await repository.update(1, { name: "", description: "", location_id: 1, quantity: 0 });
    expect(item).toBeNull();
  });

  it("should delete an item", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

    const result = await repository.delete(1);
    expect(result).toBe(true);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM items WHERE id = $1', [1]);
  });

  it("should return false if delete fails", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 0 });

    const result = await repository.delete(1);
    expect(result).toBe(false);
  });
});
