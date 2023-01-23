import { combineReducers } from 'redux';
import nftReducer from './nfts';
import hotCollectionsReducer from './hotCollections';
import authorListReducer from './authorList';
import filterReducer from './filters';
import blogPostsReducer from './blogs';
import sidebarReducer from './sidebarReducer';
import walletReducer from './walletReducer';

export const rootReducer = combineReducers({
  NFT: nftReducer,
  hotCollection: hotCollectionsReducer,
  authors: authorListReducer,
  filters: filterReducer,
  blogs: blogPostsReducer,
  sidebar: sidebarReducer,
  wallet: walletReducer
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;