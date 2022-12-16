/* eslint-disable max-len */
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
<main id="catalog">
<article class="restoDetail" tabindex="0">
          <img class="resto__image lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.restaurant.pictureId}" alt="${restaurant.restaurant.title}" />
          <div class="resto__content">
            <h2 class="resto__name">${restaurant.restaurant.name}</h2>
            <p class="resto__city">${restaurant.restaurant.city}</p>
            <p class="resto__city">${restaurant.restaurant.address}</p>
            <p class-"resto__rating">rating: ${restaurant.restaurant.rating}</p>
            <p class="resto__description" id="resto">${restaurant.restaurant.description}</p>

            <br>
            <p style="font-weight: bold;" class="resto__description">makanan: </p>
            ${restaurant.restaurant.menus.foods.map((food) => `
            <div class="review_item">
                <div class="resto__description">
                        <p>${food.name}</p>
                     </div>
            </div>
`).join('')}
<br>
<p style="font-weight: bold;" class="resto__description">minuman: </p>
${restaurant.restaurant.menus.drinks.map((drink) => `
<div class="review_item">
    <div class="resto__description">
            <p>${drink.name}</p>
         </div>
</div>
`).join('')}

            <br>
            <p style="font-weight: bold;" class="resto__description">review</p>
            ${restaurant.restaurant.customerReviews.map((review) => `
            <div class="review_item">
                
                    <div class="resto__description">
                        <p>${review.name}</p>
                        <p>${review.date}</p>
                    </div>
                
                <div class="resto__description">
                    <p>${review.review}</p>
                </div>
            </div>
            <br>  
`).join('')}
          </div>
        </article>
      </main>
`;

const createRestaurantItemTemplate = (restaurant) => `
<article class="resto" tabindex="0">
          <img class="resto__image lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.title}" />
          <div class="resto__content">

            <h2 class="resto__name"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h2>

            <p class="resto__city">${restaurant.city}</p>

            <p class-"resto__rating">rating: ${restaurant.rating}</p>

            <p class="resto__description" id="resto1">${restaurant.description}</p>
          </div>
        </article>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate, createRestaurantItemTemplate, createLikeButtonTemplate, createLikedButtonTemplate,
};
