import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  Alert
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Keychain from 'react-native-keychain';
import { observer, inject, } from 'mobx-react';
import { observable } from 'mobx';

import { Input, Button, Wrapper } from '../../../commons';
import { theme } from "../../../constants/theme";
import { api } from "../../../api/ApiConfig";
import { NavigationService } from '../../../constants/NavigationService';

// @inject(stores => ({
//   userStore: stores.userStore,
//   authStore: stores.authStore,
//   }))

@inject('authStore')

@observer
export default class Login extends Component {
  @observable
  isLoading= false

  @observable
  isShowRegister= false

  @observable
  email= ''
  
  @observable
  password= ''

  render() {
    return (
      <Wrapper
        isLoading={this.isLoading} 
        customStyle={{flex:1}}
      >
        <ImageBackground
          source={require('../../../assets/images/backgrounds/phone.jpeg')}
          style={styles.backgroundImg}
        >
          
            <View style={styles.loginContainer}>
              
              <KeyboardAwareScrollView
                style={{ width: '100%' }}
                enableOnAndroid
                extraHeight={100}
                innerRef={ref => this.scroll = ref}
              >
                  {/* App Name */}
                <View style={styles.loginWrapper}>
                  <Text style={styles.appName}>Hutech Care</Text>
                  {/* Input Field */}
                {this._onRenderInputField()}
                {this._onRenderForgetPassword()}
                </View>
              </KeyboardAwareScrollView>
              

                {/* Need Register? */}
                {this.isShowRegister ? this._onRenderSuggestRegister() : null}
            </View>
        </ImageBackground>
      </Wrapper>
    )
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyBoardDidHide.bind(this))
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  };
  

  _keyboardDidShow() {
    this.isShowRegister = false
  }

  _keyBoardDidHide() {
    this.isShowRegister = true
  }
  

  _loginWithEmailPassword = async () => {
    this.isLoading=true
    let mess = await this.props.authStore.login(this.email, this.password)
    if(mess == 200){
      return setTimeout(() => {
        this.isLoading = false
        NavigationService.navigate('Tab')
      }, 1500);
    }
    return Alert.alert(
      'Thông báo',
      mess,
      [
        {
          text: 'Cancel',
          onPress: () => this.isLoading = false ,
          style: 'cancel',
        },
      ],
      {cancelable: false},
    )
  }
  
  // This is Input field
  _onRenderInputField() {
    return (
      <View style={styles.inputWrapper}>
        <Input
          onTouchStart={()=> this.email=''}
          placeholder='Email'
          value={this.email}
          onChange={text => this.email = text}
          returnKeyType='next'
        />

        <Input
          onTouchStart={()=> this.password=''}
          placeholder='Password'
          clearTextOnFocus
          value={this.password}
          onChange={text => this.password = text}
          customStyle={{ marginTop: 50, marginBottom: 40 }}
          secureTextEntry
        />

        <Button
          onPress={() => this._loginWithEmailPassword()}
        >Login</Button>
      </View>
    )
  }

  // This is when user forget password
  _onRenderForgetPassword() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Reset')}
        style={styles.forgetWrapper}
      >
        <Text style={styles.forgetTxt}>Forget Password?</Text>
      </TouchableOpacity>
    )
  }

  // This is when user want to become a buddhist
  _onRenderSuggestRegister() {
    return (
      <View style={styles.registerWrapper}>
        <Text style={styles.registerTxt}>Don't have account?</Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={[styles.registerTxt, { fontWeight: '500' }]}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  } 
  
}

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    width:'100%',
    height:'100%',
  },
  loginContainer: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
  },
  loginWrapper: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  appName: {
    color: theme.color.myAppColor,
    textTransform: 'uppercase',
    fontSize: 35,
    fontWeight: '500',
    letterSpacing: 6,
  },
  inputWrapper: {
    width: '85%',
    marginTop: 150,
  },
  forgetWrapper: {
    width: '65%',
    marginTop: 10,
  },
  forgetTxt: {
    color: theme.color.white,
    textAlign: 'right',
    fontSize: 15,
  },
  registerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15
  },
  registerTxt: {
    color: theme.color.white,
    marginRight: 10
  }
})
