const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.waitForElement('.resto__content a', 15);
  I.seeElement('.resto__content a');
  // LIKE RESTAURANT
  const firstRestaurant = locate('.resto__content a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.waitForElement('#likeButtonContainer', 100);
  I.seeElement('#likeButtonContainer');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.waitForElement('.resto__content', 100);
  I.seeElement('.resto__name');
  const likedRestaurantTitle = await I.grabTextFrom('.resto__name a');
  // UNLIKE RESTAURANT
  I.click(likedRestaurantTitle);
  I.waitForElement('#likeButtonContainer', 100);
  I.seeElement('#likeButtonContainer');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.dontSeeElement('.resto__content a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
