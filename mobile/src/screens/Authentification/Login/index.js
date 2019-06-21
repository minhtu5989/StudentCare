import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Keychain from 'react-native-keychain';

import { Input, Button, Wrapper } from '../../../components';
import { theme } from "../../../constants/theme";
import { api } from "../../../api/ApiConfig";

export default class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      //  isLoading: false,
       email: null,
       password: null,
    }

    isLoading= false

  }

  render() {
    const { isShowRegister } = this.state
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
    const { email, password } = this.state
    
    //=========================SET new token
    try {
      if(!email || email == '' || !password || password == '') return alert('Vui lòng không để trống')

      // this.setState({isLoading: true})
      isLoading= true
      const res = await api.LogIn 
      .headers({
          "Content-Type": "application/json",
      })
      .post({
          "email": this.state.email,
          "password": this.state.password,
      })
      .json()

      console.log('responseeeeee', res);
      
      if(!res){
        // this.setState({isLoading: false})
        isLoading= false

        return alert('Phát hiện lỗi không kết nối internet.')
      }

      if(res.message) {
        // this.setState({isLoading: false})
        isLoading= false
        return alert(res.message)
      }

      if(res.token){
        const credentials = await Keychain.setGenericPassword(
          'token',
          res.token,
          { accessControl: this.state.accessControl }
        );
        if(!credentials) return this.setState({ status: 'Could not save credentials' })

        isLoading= false
        this.setState({ status: 'Credentials saved!' });
        console.log('Status: ', this.state.status);
        console.log('Access Control: ', this.state.accessControl);
        
        this.props.navigation.navigate('Main')
      }

    } catch (err) {
      this.setState({ status: 'Could not save credentials, ' + err });
      console.log("Status: ", this.state.status);
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
