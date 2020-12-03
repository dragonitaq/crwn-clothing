import { createSelector } from 'reselect';

const selectorShop = (state) => state.shop;

export const selectShopCollections = createSelector([selectorShop], (shop) => shop.collections);
