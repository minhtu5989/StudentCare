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

import { Input, Button, Wrapper } from '../../../components';
import { theme } from "../../../constants/theme";
import { api } from "../../../api/ApiConfig";
import { NavigationService } from '../../../constants/NavigationService';

export default class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoading: false,
       email: null,
       password: null,
    }
  }

  render() {
    const { isShowRegister, isLoading } = this.state
    return (
      <Wrapper
        isLoading={isLoading}
        customStyle={{flex:1}}
      >
        <ImageBackground
          source={require('../../../assets/images/background/phone.jpeg')}
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
                {isShowRegister ? this._onRenderSuggestRegister() : null}
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
    this.setState({ isShowRegister: false })
  }

  _keyBoardDidHide() {
    this.setState({ isShowRegister: true })
  }
  

  _loginWithEmailPassword = async () => {
    try {
      const { email, password } = this.state
      if(!email || email == '' || !password || password == '') return alert('Vui lòng không để trống')

      this.setState({isLoading: true})
      await api.LogIn 
        .headers({
            "Content-Type": "application/json",
        })
        .post({
            "email": this.state.email,
            "password": this.state.password,
        })
        .json( async(json) => {
          if(json.message) {
            
            Alert.alert(
              'Thông báo',
              (json.message === 'Email was not exist')? 'Email không tồn tại': 'Sai mật khẩu',
              [
                {
                  text: 'Cancel',
                  onPress: () => this.setState({isLoading: false}),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
            return alert(json.message)
          }
          if(json.token){
            const credentials = await Keychain.setGenericPassword(
              'token',
              json.token,
              { accessControl: this.state.accessControl }
            );
            if(!credentials) return console.log('Could not save credentials');
            console.log('Credentials saved!');
      
            setTimeout(() => {
              this.setState({isLoading: false})
              NavigationService.navigate('Home')
            }, 1500);

        }
      })

    } catch (error) {
      return console.log('==============Error: ', error.message)
    }

  }
  
  // This is Input field
  _onRenderInputField() {
    return (
      <View style={styles.inputWrapper}>
        <Input
          placeholder='Email'
          onChange={email => this.setState({ email })}
          returnKeyType='next'
        />

        <Input
          placeholder='Password'
          clearTextOnFocus
          onChange={password => this.setState({ password })}
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
