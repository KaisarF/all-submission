import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import favoriteRestaurant from '../src/scripts/data/favorite-restaurant';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await favoriteRestaurant.getAllRestaurant()).forEach(async (restaurant) => {
      await favoriteRestaurant.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(favoriteRestaurant);
});
