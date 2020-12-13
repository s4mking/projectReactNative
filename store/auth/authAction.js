export const login = ({email,password,token}) => (
  {
    type: 'LOGIN',
    payload: {email,password,token},
  }
);


export const logout = () => ({
  type: 'LOGOUT',
});
