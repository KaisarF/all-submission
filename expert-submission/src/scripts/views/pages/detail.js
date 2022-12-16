import UrlParser from '../../routes/url-parser';
import theRestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import favoriteRestaurant from '../../data/favorite-restaurant';

const Detail = {
  async render() {
    return `
    <div class="contentDetail" id="Restaurants"></div>
    <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await theRestaurantSource.detailRestaurant(url.id);
    const restaurantsContainer = document.querySelector('#Restaurants');
    restaurantsContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: favoriteRestaurant,
      restaurant: {
        pictureId: restaurant.restaurant.pictureId,
        id: restaurant.restaurant.id,
        city: restaurant.restaurant.city,
        address: restaurant.restaurant.address,
        rating: restaurant.restaurant.rating,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
      },
    });
  },
};

export default Detail;
