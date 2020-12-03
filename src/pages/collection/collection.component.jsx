import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selector';
import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

/* ownProps is the props of THIS component that we warp in THIS connect. It's useful if we want to use it to do some operation that has relation with this component (CollectionPage) */
const mapStateToProps = (state, ownProps) => ({
  /* Notice we pass state at the end because in selectCollection, we turn a fn which consists of createSelector which then will take in the state. */
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
