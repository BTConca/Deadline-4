import { combineReducers } from 'redux';
import ItemsReducer from './reducer-items';

const rootReducer = combineReducers({
    items : ItemsReducer
});

export default rootReducer;