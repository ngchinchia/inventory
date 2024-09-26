// src/routes/locationRoutes.ts
import { Router } from "express";
import { LocationController } from "../../controllers/v1/locationController";
import { locationSchema } from "../../middleware/locationSchema";
import { validateSchema } from "../../middleware/validationMiddleware";

const locationRoutes = Router();
const locationController = LocationController();

locationRoutes.get('/locations', locationController.getAllLocations);
locationRoutes.get('/location/:id', locationController.getLocationById);
locationRoutes.post('/location', validateSchema(locationSchema), locationController.createLocation);
locationRoutes.put('/location/:id', validateSchema(locationSchema), locationController.updateLocation);
locationRoutes.delete('/location/:id', locationController.deleteLocation);

export default locationRoutes;