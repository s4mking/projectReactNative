
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
        ...state,
        email:INITIAL_STATE.email,
        password:INITIAL_STATE.password,
        token:INITIAL_STATE.token
      };
    default:
      return state
  }
}

export default authReducer;