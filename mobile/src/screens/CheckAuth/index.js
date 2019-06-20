import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import * as Keychain from 'react-native-keychain';

import { NavigationService } from "../../constants/NavigationService";
import { Input, Button, Wrapper } from '../../components';
import { theme } from "../../constants/theme";


export default class CheckAuth extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       accessControl: null
    }
  }

  render() {
    return (
        <ImageBackground
          source={require('../../assets/images/background/phone.jpeg')}
          style={styles.backgroundImg}
        >
          
            <View style={styles.loginContainer}>
              
            </View>
        </ImageBackground>
    )
  }


  componentDidMount = async() => {

    Keychain.getSupportedBiometryType().then(biometryType => {
        this.setState({ biometryType });
        console.log('biometryType: ',biometryType);
    });

    // Get token from KeyChain
    try {
      const credentials = await Keychain.getGenericPassword();
      
      if (credentials) {
        this.setState({ ...credentials, status: 'Credentials loaded!' });
        console.log("Status: ", this.state.status);
        console.log("credentials: ", credentials);
        NavigationService.navigate('Main')
      } else {
        this.setState({ status: 'No credentials stored.' });
        console.log("Status: ", this.state.status);
        NavigationService.navigate('Auth')
      }
    } catch (err) {
      this.setState({ status: 'Could not load credentials. ' + err });
      console.log("Status: ", this.state.status);
    }
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
})
