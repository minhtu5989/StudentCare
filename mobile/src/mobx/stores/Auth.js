import { types, flow } from 'mobx-state-tree';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

import { NavigationService } from '../../constants/NavigationService'
import { api } from '../../api/ApiConfig'
import { CurrentUserModel } from '../models/CurrentUser';
import { stores } from '../stores';

export const AuthStore = types
.model(`AuthStore`, {
  info: types.maybeNull(CurrentUserModel),
  role: types.maybeNull(types.string)
})
.actions(self => ({

  verifyToken: flow(function*(){
    try {
    //=========================VERYFFI TOKEN
      const credentials = yield Keychain.getGenericPassword();
      if (credentials) {
        console.log('=========================== Got credentials');
        return credentials.password
      } else {
        console.log("=========================== No credentials stored.");
        NavigationService.navigate('Auth')
      }
    } catch (error) {
      console.log('error', error);
    }
  }),

  getUserInfo: flow(function*(token){
    try {

      const res = yield api.GetUserInfo 
        .headers({ 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        })
        .get()
        .json()

      if(!res.userInfo) throw new Error
      self.role = res.userInfo.role
      self.info = res.userInfo
      // console.log('------------------------------', self.info);
      
      return 

    } catch (error) {
      console.log('................Error:   ', error)
    }
  }),
  
  saveToken: flow(function*(token){
    //=========================SET TOKEN
    
    try {
      const credentials = yield Keychain.setGenericPassword(
        'token',
        token,
      );
      if(!credentials) throw new Error
      console.log('=========================== Credentials saved --> Save Token');
    } catch (err) {
      console.log("Could not load credentials....Error: ", err);
    }
  }),

  setupAuth: flow(function*(){
    const token = yield self.verifyToken()
    yield self.getUserInfo(token)
    if(self.role == 'student') yield stores.stuStore.getStu()
    return token
  }),

  login: flow(function*(userName, password){
    if(!userName || !password) return alert('Vui lòng không để trống.')
    try {
      const res = yield api.LogIn 
        .headers({
            "Content-Type": "application/json",
        })
        .post({
            "userName": userName,
            "password": password,
        })
        .json()

      if(!res) throw new Error

      if(res.status != 200){
        if(res.status == 301){
          return mess = 'Tài khoảng không tồn tại'
        }
        if(res.status == 302){
          return mess = 'Sai mật khẩu'
        }
        if(res.status == 303){
          return mess = 'Vui lòng không để trống'
        } 
      }
      if(res.status == 200){
        yield self.saveToken(res.token)
        yield self.setupAuth()
        return 200
      }
    } catch (error) {
      alert('Lỗi kết nối Internet')
      return console.log('==============Error: ', error.message)
    }
  }),

  resetToken: flow(function*(){
    //=========================RESET TOKEN
    try {
      const credentials = yield Keychain.resetGenericPassword();
      if(credentials){
        console.log("=========================== Credentials Reset --> Log Out");
        setTimeout(() => {
          NavigationService.navigate('CheckAuth')
        }, 300); 
        alert('Đăng xuất')
      }
    } catch (err) {
      console.log("Could not reset credentials......Error: ", err);
    }
  }),
  
}))




