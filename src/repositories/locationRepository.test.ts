
import { LocationRepository } from './locationRepository';
import pool from '../config/db';

import { Location } from '../models/v1/locationModel';

jest.mock('../config/db', () => ({
  query: jest.fn(),
}));

describe("LocationRepository", () => {
  const repository = LocationRepository();

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("should get all locations", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, name: "Location 1", x: 10, y: 20 }],
    });

    const locations = await repository.getAll();
    expect(locations).toEqual([{ id: 1, name: "Location 1", x: 10, y: 20 }]);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM locations");
  });

  it("should get a location by ID", async () => {
    const mockLocation = { id: 1, name: "Location 1", x: 10, y: 20 };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockLocation] });

    const location = await repository.getById(1);
    expect(location).toEqual(mockLocation);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM locations WHERE id = $1", [1]);
  });

  it("should return null if location not found", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const location = await repository.getById(1);
    expect(location).toBeNull();
  });

  it("should create a new location", async () => {
    const newLocation: Location = { name: "Location 1", x: 10, y: 20 };
    const createdLocation = { id: 1, ...newLocation };
    
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [createdLocation] });

    const result = await repository.create(newLocation);
    expect(result).toEqual(createdLocation);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO locations (name, x, y) VALUES ($1, $2, $3) RETURNING *",
      [newLocation.name, newLocation.x, newLocation.y]
    );
  });

  it("should update an existing location", async () => {
    const updatedLocation: Location = { name: "Updated Location", x: 30, y: 40 };
    const resultLocation = { id: 1, ...updatedLocation };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [resultLocation] });

    const location = await repository.update(1, updatedLocation);
    expect(location).toEqual(resultLocation);
    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE locations SET name = $1, x = $2, y = $3 WHERE id = $4 RETURNING *",
      [updatedLocation.name, updatedLocation.x, updatedLocation.y, 1]
    );
  });

  it("should return null if location to update is not found", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const location = await repository.update(1, { name: "", x: 0, y: 0 });
    expect(location).toBeNull();
  });

  it("should delete a location", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

    const result = await repository.delete(1);
    expect(result).toBe(true);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM locations WHERE id = $1', [1]);
  });

  it("should return false if delete fails", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 0 });

    const result = await repository.delete(1);
    expect(result).toBe(false);
  });
});
