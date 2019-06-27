import { types, flow } from 'mobx-state-tree';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

import { NavigationService } from '../../constants/NavigationService'
import { api } from '../../api/ApiConfig'
import { CurrentUserModel } from '../models/CurrentUser';

const TOKEN_KEY = '@TuLuong283/token'

export const AuthStore = types
.model(`AuthStore`, {
  authToken: types.maybe(types.string),
  info: types.maybe(CurrentUserModel),
})
.actions(self => ({

  getAuthToken: flow(function*(){
    try {
    //=========================VERYFFI TOKEN
      const credentials = yield Keychain.getGenericPassword();
      if (credentials) {
        self.authToken = credentials.password
        console.log('=========================== Got credentials');
      } else {
        console.log("No credentials stored.");
        NavigationService.navigate('Auth')
      }
    } catch (error) {
      console.log('error', error);
    }
  }),

  getUserInfo: flow(function*(){
    try {

      if(self.authToken){
        res = yield api.GetTKB 
          .headers({ 
            "Content-Type": "application/json",
            Authorization: `Bearer ${self.authToken}` 
          })
          .get()
          .json()

        self.info = res.data;
        NavigationService.navigate('Main')
      }
    } catch (error) {
      console.log('................Error:   ', error)
      return alert('Phát hiện lỗi Internet')
    }
  }),
  
  setupAuth: flow(function*(){
      yield self.getAuthToken()
      yield self.getUserInfo()
  }),

  saveToken: flow(function*(token){
    //=========================SET TOKEN
    try {
      const credentials = yield Keychain.setGenericPassword(
        'token',
        token,
      );
      if(credentials){
        console.log('Credentials saved --> Save Token');
        self.authToken = credentials.password;
      }
    } catch (err) {
      console.log("Could not load credentials....Error: ", err);
    }
  }),

  login: flow(function*(email, password){
    if(!email || !password) return alert('Vui lòng không để trống')
    try {
      const res = yield api.LogIn 
        .headers({
            "Content-Type": "application/json",
        })
        .post({
            "email": email,
            "password": password,
        })
        .json()

      // console.log('res ', res);
      if(res.status != 200){
        var mess 
        if(res.status == 301){
          return mess = 'Email không tồn tại'
        }
        if(res.status == 302){
          return mess = 'Sai mật khẩu'
        }
        if(res.status == 303){
          return mess = 'Vui lòng không để trống'
        } 
      }

      if(res.status == 200){
        const credentials = yield Keychain.setGenericPassword(
          'token',
          res.token,
        );
        if(!credentials) return console.log('Could not save credentials');
        console.log('Credentials saved!');

        yield self.saveToken(res.token)
        // yield self.getUserInfo()

        return 200
      }

    } catch (error) {
      return console.log('==============Error: ', error.message)
    }
  }),

  logOut: flow(function*(){
    //=========================RESET TOKEN
    try {
      const response = yield Keychain.resetGenericPassword();
      if(response){
        console.log("Credentials Reset --> Log Out");
        setTimeout(() => {
          NavigationService.navigate('CheckAuth')
        }, 500); 
      }
    } catch (err) {
      console.log("Could not reset credentials......Error: ", err);
    }
  }),
  
}))




