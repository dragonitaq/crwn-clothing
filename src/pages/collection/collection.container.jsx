import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
  /* Yihua doesn't care to explain this. The explanation can be found here in Q&A link:
  https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15221888#questions/8004528 */
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

const CollectionPageContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPage);

export default CollectionPageContainer;
