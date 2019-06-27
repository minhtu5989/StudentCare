import { types, flow } from 'mobx-state-tree';
import * as Keychain from 'react-native-keychain';

import { NavigationService } from '@src/constants'
import { api } from '../api/ApiConfig'
// import { CurrentUserModel } from '../models/CurrentUser';

const TOKEN_KEY = '@TuLuong283/token'

export const AuthStore = types
.model(`AuthStore`, {
  authToken: types.maybe(types.string),
  // info: types.maybe(CurrentUserModel),
})
.actions(self => ({

  // getAuthToken: flow(function*(){
  //   try {
  //   //=========================VERYFFI TOKEN
  //     const credentials = yield Keychain.getGenericPassword();
  //     if (credentials) {
  //       self.authToken = credentials.password
  //       console.log('=========================== Got credentials');
  //     } else {
  //       console.log("No credentials stored.");
  //       NavigationService.navigate('Auth')
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }),

  // getUserInfo: flow(function*(){
  //   try {

  //     if(self.authToken){
  //       res = yield api.GetTKB 
  //         .headers({ 
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${self.authToken}` 
  //         })
  //         .get()
  //         .json()

  //       self.info = res.data;
  //       NavigationService.navigate('Main')
  //     }
  //   } catch (error) {
  //     console.log('................Error:   ', error)
  //     return alert('Phát hiện lỗi Internet')
  //   }
  // }),
  
  // setupAuth: flow(function*(){
  //     yield self.getAuthToken()
  //     yield self.getUserInfo()
  // }),

  // saveToken: flow(function*(token){
  //   try {
  //     console.log('Save Token !!  ');
      
  //     yield AsyncStorage.setItem(TOKEN_KEY, token)
      
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }),

  // login: flow(function*(providerToken, provider){
  //   try {
  //     const res = yield customersApi
  //     .post({
  //       token: providerToken,
  //       provider 
  //     })
  //     .json()

  //     if(res.token){
  //       self.authToken = res.token;
  //       yield self.saveToken(res.token)
  //       yield self.getUserInfo()
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }),

  // logOut(){
  //   AsyncStorage.removeItem(TOKEN_KEY)
  //   console.log('Log out !!')
  //   setTimeout(() => {
  //     NavigationService.navigate('Auth')
  //   }, 500); 
  // },
  
}))




