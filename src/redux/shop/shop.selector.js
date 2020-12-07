import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectorShop = (state) => state.shop;

export const selectCollections = createSelector([selectorShop], (shop) => shop.collections);

export const selectCollectionsPreview = createSelector([selectCollections], (collections) => (collections ? Object.keys(collections).map((key) => collections[key]) : []));
/* Student proposed to use Object.values to achieve same result with fewer code. Like below: */
// export const selectCollectionsPreview = createSelector([selectCollections], (collections) => Object.values(collections));

export const selectCollection = memoize((collectionUrlParam) => createSelector([selectCollections], (collections) => (collections ? collections[collectionUrlParam.toLowerCase()] : null)));
