
const INITIAL_STATE = {
  status:false,
}

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        status:true
      };
    case 'END_LOADING':
      return {
        ...state,
        status:false,
      };
    default:
      return state
  }
}

export default loadingReducer;