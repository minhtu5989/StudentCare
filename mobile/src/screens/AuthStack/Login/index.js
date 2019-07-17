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
import { observer, inject, } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from 'react-native-elements';

import { Input, Wrapper } from '../../../commons';
import { theme } from "../../../constants/theme";
import { NavigationService } from '../../../constants/NavigationService';

@inject('authStore')
@observer
export default class Login extends Component {
  @observable
  isLoading= false

  @observable
  isShowRegister= false

  @observable
  userName= ''
  // tt.trang@hutech.edu.vn
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
    try {
      this.isLoading=true
      let mess = await this.props.authStore.login(this.userName, this.password)
      if(mess == 200){
        if(this.props.authStore.role == 'student'){
          console.log(`==================================== Credentials loaded -------- role: ${this.props.authStore.role}`);
          setTimeout(() => {
            NavigationService.navigate('TabStu')
          }, 1000);
          return this.isLoading = false
        }
        setTimeout(() => {
          console.log(`==================================== Credentials loaded -------- role: ${this.props.authStore.role}`);
          NavigationService.navigate('TabTea')
        }, 1000);
        return this.isLoading = false
      }
      return Alert.alert(
        'Thông báo',
        mess,
        [
          {
            text: 'Cancel',
            onPress: () => this.isLoading = false,
            style: 'cancel',
          },
        ],
        {cancelable: false},
      )
    } catch (error) {
      console.log('Error: ', error);
    }
    finally{
      this.isLoading = false
    }    
  }
  
  // This is Input field
  _onRenderInputField() {
    return (
      <View style={styles.inputWrapper}>
        <Input
          onTouchStart={()=> this.userName=''}
          placeholder='User name'
          value={this.userName}
          onChangeText={text => this.userName = text}
          returnKeyType='next'
        />

        <Input
          onTouchStart={()=> this.password=''}
          placeholder='Password'
          value={this.password}
          onChangeText={text => this.password = text}
          customStyle={{ marginTop: 50, marginBottom: 40 }}
          secureTextEntry
        />

        <Button
          title="Log In"
          style={{width: '85%', alignSelf: 'center', marginTop: '20%'}}
          onPress={this._loginWithEmailPassword}
        />
        
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
