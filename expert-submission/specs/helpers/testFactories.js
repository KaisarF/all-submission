import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import favoriteRestaurant from '../../src/scripts/data/favorite-restaurant';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: favoriteRestaurant,
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
