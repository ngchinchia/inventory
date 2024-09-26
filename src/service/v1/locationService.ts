import { LocationRepository } from '../../repositories/locationRepository';
import { Location } from '../../models/v1/locationModel';
import { NotFoundError } from '../../errors/NotFoundError';

export const LocationService = () => {
  const locationRepository = LocationRepository();

  return {
    getAllLocations: async (): Promise<Location[]> => {
      return locationRepository.getAll();
    },

    getLocationById: async (id: number): Promise<Location | null> => {
      const location = await locationRepository.getById(id);
      if (!location) throw new NotFoundError("Location not found");
      return location;
    },

    createLocation: async (location: Location): Promise<Location> => {
      return locationRepository.create(location);
    },

    updateLocation: async (id: number, location: Location): Promise<Location | null> => {
      const existingLocation = await locationRepository.getById(id);
      if (!existingLocation) throw new NotFoundError("Location not found");
      return locationRepository.update(id, location);
    },

    deleteLocation: async (id: number): Promise<boolean> => {
      const location = await locationRepository.delete(id);
      if (!location) throw new NotFoundError("Location not found");
      return location;
    },
  };
};