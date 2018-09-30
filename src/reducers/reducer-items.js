import FETCH_IMAGE_DATA from '../actions/index';

export default function(state = null, action) {

  switch (action.type) {
    case FETCH_IMAGE_DATA: {
      if(action.payload.data && action.payload.data.items){
        state = action.payload.data.items;
      }
      return state;
    }
    default: return state;
  }
}

