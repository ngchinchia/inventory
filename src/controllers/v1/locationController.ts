import { Request, Response, NextFunction } from 'express';
import { LocationService } from '../../service/v1/locationService';

interface LocationController {
  getAllLocations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getLocationById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  createLocation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  updateLocation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteLocation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export const LocationController = (): LocationController => {
  const locationService = LocationService();

  const getAllLocations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const locations = await locationService.getAllLocations();
      res.status(200).json(locations);
    } catch (error) {
      next(error);
    }
  };

  const getLocationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const location = await locationService.getLocationById(id);
      res.status(200).json(location);
    } catch (error) {
      next(error);
    }
  };

  const createLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newLocation = await locationService.createLocation(req.body);
      res.status(201).json({ message: 'Location created successfully', data: newLocation });
    } catch (error) {
      next(error);
    }
  };

  const updateLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const updatedLocation = await locationService.updateLocation(id, req.body);
      res.status(200).json({ message: 'Location updated successfully', data: updatedLocation });
    } catch (error) {
      next(error);
    }
  };

  const deleteLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await locationService.deleteLocation(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  return { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation };
};