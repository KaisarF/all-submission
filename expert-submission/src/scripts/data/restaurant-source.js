import API_ENDPOINT from '../globals/api-endpoints';

class theRestaurantSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.HOME);
    console.log(response);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    console.log(response);
    // const responseJson = await response.json();
    // return responseJson.restaurants;
    return response.json();
  }
}

export default theRestaurantSource;
