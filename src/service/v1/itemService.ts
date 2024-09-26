import { Item } from "../../models/v1/itemModel";
import { ItemRepository } from "../../repositories/itemRepository";
import { NotFoundError } from "../../errors/NotFoundError";


export const ItemService = () => {
  const itemRepository = ItemRepository();

  return {
    getAllItems: async (): Promise<Item[]> => {
      return itemRepository.getAll();
    },

    getItemById: async (id: number): Promise<Item | null> => {
      const item = await itemRepository.getById(id);
      if (!item) throw new NotFoundError("Item not found");
      return item;
    },

    createItem: async (item: Item): Promise<Item> => {
      return itemRepository.create(item);
    },

    updateItem: async (id: number, item: Item): Promise<Item | null> => {
      const existingItem = await itemRepository.getById(id);
      if (!existingItem) throw new NotFoundError("Item not found");
      
      const updatedItem = await itemRepository.update(id, item);
      return updatedItem;
    },

    deleteItem: async (id: number): Promise<boolean> => {
      const item = await itemRepository.delete(id);
      if (!item) throw new NotFoundError("Item not found");
      return item;
    },
  };
};
