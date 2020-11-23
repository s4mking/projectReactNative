import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { api, loadAuthorisationHeader } from "../helpers/axios";
import React from 'react';
import { AsyncStorage } from 'react-native';


const store = () => {
  const self = {};

  self.actions = {
    setLogin: action((email,password) =>  {
      self.email = email
      self.pasword=password
    }),
    setToken: action((token) =>  {
      self.token = token
    }),
    TriggerLogin: action((email,password) =>  {
      api
      .post("/login", {
        email:email,
        password: password
      })
      .then(res => {
        console.log("this is the res")
        console.log(res.data.token);
        if (res.data.token != undefined) {
          AsyncStorage.setItem( "userToken", res.data.token)
        } else {
          alert(
            "Vous n'avez pas rentré un password et un email valide veuillez réessayer"
          );
        }
      })
      .catch(err =>{
        console.log(err)
      })
    }),

  }
  return extendObservable(self, { name: 'tommy' });
}

export default store