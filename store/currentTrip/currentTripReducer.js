
const INITIAL_STATE = {
  trip:null,
  indexLoc:0,
};

const currentTripReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'NEW_CURRENT':
      return {
        ...state,
        trip:action.payload.trip,
      };
    case 'NEXT_LOC':
      return {
        ...state,
        indexLoc:state.indexLoc + 1,
      };
    case 'LAST_LOC':
      return {
        ...state,
        indexLoc:state.indexLoc - 1,
      };
    default:
      return state
  }
}

export default currentTripReducer;