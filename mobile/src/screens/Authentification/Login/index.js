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

import { colors, storageKey } from '../../../utils';
import { Input, Button, Modal } from '../../../components';

const auth = firebase.auth()


export default class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email: null,
       password: null,
       loginError: null,
       isShowRegister: true,
       isShowModal: false,
    }
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
    try {
      const user = await auth.signInWithEmailAndPassword(email, password)
      if (user) {
        const token = await auth.currentUser.getIdToken()
        
        if (token) {
          await AsyncStorage.setItem(storageKey.token, JSON.stringify(token))
          await AsyncStorage.setItem(storageKey.userInfo, JSON.stringify(user))
          this.props.navigation.navigate('Main')
        }
      }
    } catch (error) {
      console.log('LOGIN ERROR', error.code)
      this.setState({ loginError: error })
      this._onRenderErrMess()
      this._toggleModal()
    }
  }
  
  // This is Input field
  _onRenderInputField() {
    return (
      <View style={styles.inputWrapper}>
        <Input
          placeholder='Email'
          onChange={email => this.setState({ email })}
        />

        <Input
          placeholder='Password'
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

  // Return error Message 

  _onRenderErrMess = () => {
    const { loginError } = this.state
    if (loginError !== null) {
      if (loginError.code === 'auth/invalid-email') {
        return 'Email should follow format example@example.com. Please try again'
      } else if (loginError.code === 'auth/user-not-found') {
        return `Oop! User doesn't exist! Poor you!`
      } else if (loginError.code === 'auth/wrong-password') {
        return 'Oop! Password you entered is not correct. Please try again'
      }
    }
  }

  // Toggle Modal
  _toggleModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }

  // Render Modal
  _onRenderModal = () => {
    const { isShowModal } = this.state
    console.log('HEY IS SHOW MODAL', isShowModal)
    if (isShowModal) {
      return (
        <Modal
          isVisible={isShowModal}
          message={this._onRenderErrMess()}
          onPress={() => this._toggleModal()}
        />
      )
    }
  }

  render() {
    const { isShowRegister, isShowModal } = this.state
    return (
      <ImageBackground
        source={require('../../../assets/images/zenstone.jpg')}
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
          <Text style={styles.appName}>Zen Stone</Text>
          {/* Input Field */}
         {this._onRenderInputField()}
        {this._onRenderForgetPassword()}
        </View>
      </KeyboardAwareScrollView>
       

        {/* Need Register? */}
        {isShowRegister ? this._onRenderSuggestRegister() : null}
      </View>
        {this._onRenderModal()}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingTop: 80,
    alignItems: 'center',
  },
  loginWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  appName: {
    color: colors.blueSecondary,
    textTransform: 'uppercase',
    fontSize: 40,
    fontWeight: '500',
    letterSpacing: 8,
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
    color: colors.whitePrimary,
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
    color: colors.whitePrimary,
    marginRight: 10
  }
})















// import React, { Component } from 'react';
// import {
//   KeyboardAvoidingView,
//   Platform,
//   SegmentedControlIOS,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableHighlight,
//   View,
// } from 'react-native';

// import * as Keychain from 'react-native-keychain';

// const ACCESS_CONTROL_OPTIONS = ['None', 'Passcode', 'Password'];
// const ACCESS_CONTROL_MAP = [null, Keychain.ACCESS_CONTROL.DEVICE_PASSCODE, Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET]

// export default class KeychainExample extends Component {
//   state = {
//     username: '',
//     password: '',
//     status: '',
//     biometryType: null,
//     accessControl: null,
//   };

//   componentDidMount() {
//     Keychain.getSupportedBiometryType().then(biometryType => {
//       this.setState({ biometryType });
//     });
//   }

//   async save(accessControl) {
//     try {
//       await Keychain.setGenericPassword(
//         this.state.username,
//         this.state.password,
//         { accessControl: this.state.accessControl }
//       );
//       this.setState({ username: '', password: '', status: 'Credentials saved!' });
//     } catch (err) {
//       this.setState({ status: 'Could not save credentials, ' + err });
//     }
//   }

//   async load() {
//     try {
//       const credentials = await Keychain.getGenericPassword();
//       if (credentials) {
//         this.setState({ ...credentials, status: 'Credentials loaded!' });
//       } else {
//         this.setState({ status: 'No credentials stored.' });
//       }
//     } catch (err) {
//       this.setState({ status: 'Could not load credentials. ' + err });
//     }
//   }

//   async reset() {
//     try {
//       await Keychain.resetGenericPassword();
//       this.setState({
//         status: 'Credentials Reset!',
//         username: '',
//         password: '',
//       });
//     } catch (err) {
//       this.setState({ status: 'Could not reset credentials, ' + err });
//     }
//   }

//   render() {
//     return (
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={styles.container}
//       >
//         <View style={styles.content}>
//           <Text style={styles.title}>Keychain Example</Text>
//           <View style={styles.field}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               autoFocus={true}
//               autoCapitalize="none"
//               value={this.state.username}
//               onChange={event =>
//                 this.setState({ username: event.nativeEvent.text })}
//               underlineColorAndroid="transparent"
//             />
//           </View>
//           <View style={styles.field}>
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               style={styles.input}
//               password={true}
//               autoCapitalize="none"
//               value={this.state.password}
//               onChange={event =>
//                 this.setState({ password: event.nativeEvent.text })}
//               underlineColorAndroid="transparent"
//             />
//           </View>
//           {Platform.OS === 'ios' && (
//             <View style={styles.field}>
//               <Text style={styles.label}>Access Control</Text>
//               <SegmentedControlIOS
//                 selectedIndex={0}
//                 values={this.state.biometryType ? [...ACCESS_CONTROL_OPTIONS, this.state.biometryType] : ACCESS_CONTROL_OPTIONS}
//                 onChange={({ nativeEvent }) => {
//                   this.setState({
//                     accessControl: ACCESS_CONTROL_MAP[nativeEvent.selectedSegmentIndex],
//                   });
//                 }}
//               />
//             </View>
//           )}
//           {!!this.state.status && (
//             <Text style={styles.status}>{this.state.status}</Text>
//           )}

//           <View style={styles.buttons}>
//             <TouchableHighlight
//               onPress={() => this.save()}
//               style={styles.button}
//             >
//               <View style={styles.save}>
//                 <Text style={styles.buttonText}>Save</Text>
//               </View>
//             </TouchableHighlight>

//             <TouchableHighlight
//               onPress={() => this.load()}
//               style={styles.button}
//             >
//               <View style={styles.load}>
//                 <Text style={styles.buttonText}>Load</Text>
//               </View>
//             </TouchableHighlight>

//             <TouchableHighlight
//               onPress={() => this.reset()}
//               style={styles.button}
//             >
//               <View style={styles.reset}>
//                 <Text style={styles.buttonText}>Reset</Text>
//               </View>
//             </TouchableHighlight>

//             <TouchableHighlight
//               onPress={async() => {
//                 if (Platform.OS !== 'android') {
//                   alert('android-only feature');
//                   return;
//                 }
//                 const level = await Keychain.getSecurityLevel();
//                 alert(level)
//               }}
//               style={styles.button}
//             >
//               <View style={styles.load}>
//                 <Text style={styles.buttonText}>Get security level</Text>
//               </View>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   content: {
//     marginHorizontal: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '200',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   field: {
//     marginVertical: 5,
//   },
//   label: {
//     fontWeight: '500',
//     fontSize: 15,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: '#ccc',
//     backgroundColor: 'white',
//     height: 32,
//     fontSize: 14,
//     padding: 8,
//   },
//   status: {
//     color: '#333',
//     fontSize: 12,
//     marginTop: 15,
//   },
//   biometryType: {
//     color: '#333',
//     fontSize: 12,
//     marginTop: 15,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   save: {
//     backgroundColor: '#0c0',
//   },
//   load: {
//     backgroundColor: '#333',
//   },
//   reset: {
//     backgroundColor: '#c00',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 14,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
// });