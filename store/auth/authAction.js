export const login = ({email,password,id,token}) => (
  {
    type: 'LOGIN',
    payload: {email,password,id,token},
  }
);


export const logout = () => ({
  type: 'LOGOUT',
});
