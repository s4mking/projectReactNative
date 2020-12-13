
const INITIAL_STATE = {
  email:null,
  password:null,
  token:null
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email:action.payload.email,
        password:action.payload.password,
        token:action.payload.token
      };
    case 'LOGOUT':
      return {
        INITIAL_STATE
      };
    default:
      return state
  }
}

export default authReducer;