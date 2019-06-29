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
import { Input, Button, Wrapper } from '../../commons';
import { theme } from "../../constants/theme";


export default class CheckAuth extends Component {

  render() {
    return (
        <ImageBackground
          source={require('../../assets/images/backgrounds/phone.jpeg')}
          style={styles.backgroundImg}
        >
            <View style={styles.loginContainer}>
            </View>
        </ImageBackground>
    )
  }


  componentDidMount = async() => {

    // Get token from KeyChain
    try {
      const credentials = await Keychain.getGenericPassword();
      
      if (credentials) {
        console.log("Credentials loaded!");
        NavigationService.navigate('Tab')
      } else {
        console.log("No credentials stored.");
        NavigationService.navigate('Auth')
      }
    } catch (err) {
      console.log("Could not load credentials.......Error: ", err);
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
