import { Router } from "express";
import { ItemController } from "../../controllers/v1/itemController";
import { itemSchema } from "../../middleware/itemSchema";
import { validateSchema } from "../../middleware/validationMiddleware";

const itemRoutes = Router();
const itemController = ItemController();

itemRoutes.get('/items', itemController.getAllItems);       
itemRoutes.get('/item/:id', itemController.getItemById);       
itemRoutes.post('/item', validateSchema(itemSchema), itemController.createItem);       
itemRoutes.put('/item/:id', validateSchema(itemSchema), itemController.updateItem);
itemRoutes.delete('/item/:id', itemController.deleteItem);

export default itemRoutes;
