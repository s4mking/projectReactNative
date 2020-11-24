const INITIAL_STATE = {
  trips:null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        trips:action.payload.trips,
      };
    default:
      return state
  }
}

export default userReducer;