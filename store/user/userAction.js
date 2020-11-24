export const login = (userData) => (
  {
    type: 'LOGIN',
    payload: userData,
  }
);