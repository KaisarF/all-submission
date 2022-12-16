import theRestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    
      <h1 id="judul">LIST RESTAURANT</h1>
        <div class="content" id="Restaurants">
        </div>
    
        `;
  },

  async afterRender() {
    const restaurants = await theRestaurantSource.listRestaurant();
    const restaurantsContainer = document.querySelector('#Restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
