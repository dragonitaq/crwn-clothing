import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectorShop = (state) => state.shop;

export const selectCollections = createSelector([selectorShop], (shop) => shop.collections);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectCollections], (collections) => collections.find((collection) => collection.routeName === collectionUrlParam.toLowerCase()))
);
