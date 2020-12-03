import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionsPreview } from '../../redux/shop/shop.selector';

import './collections-overview.style.scss';

const CollectionsOverview = ({ collections }) => (
  <div className='collections -overview'>
    {/* We pass in all details of each collection into the function of CollectionPreview. In that fn, we handle each item for that collection individually. */}
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
