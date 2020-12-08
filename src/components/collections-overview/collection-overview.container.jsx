import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

// compose allows us to chain curry fn altogether & it is evaluate from right to left.
const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview);
// Above is the same as below without using 'compose'.
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

export default CollectionsOverviewContainer;
