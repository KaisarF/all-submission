import favoriteRestaurant from '../../data/favorite-restaurant';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
  
    <h1 id="judul">Your Liked Restaurant</h1>
      <div class="content" id="Restaurants">

      </div>
 
    `;
  },

  async afterRender() {
    const restaurant = await favoriteRestaurant.getAllRestaurant();
    const restaurantContainer = document.querySelector('#Restaurants');

    restaurant.forEach((restaurants) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurants);
    });
  },
};

export default Like;
