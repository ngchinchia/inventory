import { Request, Response, NextFunction } from 'express';
import { ItemService } from '../../service/v1/itemService';

interface ItemController {
  getAllItems: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getItemById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  createItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  updateItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export const ItemController = (): ItemController => {
  const itemService = ItemService();

  const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await itemService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };

  const getItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const item = await itemService.getItemById(id);
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  };

  const createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newItem = await itemService.createItem(req.body);
      res.status(201).json({ message: 'Item created successfully', data: newItem });
    } catch (error) {
      next(error);
    }
  };

  const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const updatedItem = await itemService.updateItem(id, req.body);
      res.status(200).json({ message: 'Item updated successfully', data: updatedItem })
    } catch (error) {
      next(error);
    }
  };

  const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await itemService.deleteItem(id);
      res.status(204).send()
    } catch (error) {
      next(error);
    }
  };

  return { getAllItems, getItemById, createItem, updateItem, deleteItem };
};
