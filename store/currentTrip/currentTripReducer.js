
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
    case 'RESET_LOC':
      return {
        ...state,
        trip:INITIAL_STATE.trip,
        indexLoc:INITIAL_STATE.indexLoc
      };
    case 'CURRENT':
      return {
        ...state,
        trip:action.payload.trip,
        indexLoc:action.payload.step,
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