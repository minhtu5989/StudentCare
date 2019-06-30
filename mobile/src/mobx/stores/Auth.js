import { types, flow } from 'mobx-state-tree';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

import { NavigationService } from '../../constants/NavigationService'
import { api } from '../../api/ApiConfig'
import { CurrentUserModel } from '../models/CurrentUser';

export const AuthStore = types
.model(`AuthStore`, {
  info: types.maybe(CurrentUserModel),
})
.actions(self => ({

  verifyToken: flow(function*(){
    try {
    //=========================VERYFFI TOKEN
      const credentials = yield Keychain.getGenericPassword();
      if (credentials) {
        console.log('=========================== Got credentials');
        console.log(credentials.password);
        
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
      const res = yield api.GetTKB 
        .headers({ 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        })
        .get()
        .json()

      if(!res.userInfo) throw new Error
        
      return self.info = res.userInfo
  
    } catch (error) {
      console.log('................Error:   ', error)
      return alert('Phát hiện lỗi Internet')
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

      if(!res) throw new Error

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
        yield self.saveToken(res.token)
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
      const result = yield Keychain.resetGenericPassword();
      if(result){
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




