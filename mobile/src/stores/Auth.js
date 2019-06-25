import { types, flow } from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';

import { customersApi } from "../api/Api";
import { CurrentUserModel } from '../models/CurrentUser';

const TOKEN_KEY = '@DanielLuong/token'

export const AuthStore = types
.model(`AuthStore`, {
  authToken: types.maybe(types.string),
  info: types.maybe(CurrentUserModel),
})
.actions(self => ({

  getAuthToken: flow(function*(){
    try {
      const token = yield AsyncStorage.getItem(TOKEN_KEY)

      if(token){
        self.authToken = token
        console.log('Got Auth !!');
      }
      else{
        NavigationService.navigate('Auth')
      }
    } catch (error) {
      console.log('error', error);
    }
  }),

  getUserInfo: flow(function*(){
    try {
      if(self.authToken){
        const res = yield customersApi
        .url('/user')
        .headers({ Authorization: `Bearer ${self.authToken}` })
        .get()
        .json();

        self.info = res;
        NavigationService.navigate('Main')
      } 
    } catch (error) {
      console.log('error', error);
    }
  }),
  
  setupAuth: flow(function*(){
      yield self.getAuthToken()
      yield self.getUserInfo()
  }),

  saveToken: flow(function*(token){
    try {
      console.log('Save Token !!  ');
      
      yield AsyncStorage.setItem(TOKEN_KEY, token)
      
    } catch (error) {
      console.log('error', error);
    }
  }),

  login: flow(function*(providerToken, provider){
    try {
      const res = yield customersApi
      .post({
        token: providerToken,
        provider 
      })
      .json()

      if(res.token){
        self.authToken = res.token;
        yield self.saveToken(res.token)
        yield self.getUserInfo()
      }
    } catch (error) {
      console.log('error', error);
    }
  }),

  logOut(){
    AsyncStorage.removeItem(TOKEN_KEY)
    console.log('Log out !!')
    setTimeout(() => {
      NavigationService.navigate('Auth')
    }, 500); 
  },
  
}))




