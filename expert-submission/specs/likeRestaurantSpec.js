import favoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Liking A restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(() => {
    addLikeButtonContainer();
  });
  // test 1
  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });

  // test 2
  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeFalsy();
  });

  // test 3
  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await favoriteRestaurant.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    favoriteRestaurant.deleteRestaurant(1); ///
  });

  // test 4
  it('should not add the restaurant when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    favoriteRestaurant.putRestaurant(1); ///
  });

  // test 5
  it('should not add a movie when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([]);
  });
});
