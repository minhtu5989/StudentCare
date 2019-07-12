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
import { observer, inject, } from 'mobx-react';
import { observable } from 'mobx'

import { NavigationService } from "../../constants/NavigationService";
import { Input, Button, Wrapper } from '../../commons';
import { theme } from "../../constants/theme";

@inject('authStore')
@observer
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
    //fetch data
    const token = await this.props.authStore.setupAuth()

    if(!token){
      console.log("==================================== No credentials stored.");
      return setTimeout(() => {
        NavigationService.navigate('Auth')
      }, 1000);
    }
    if(this.props.authStore.role == 'student'){
      console.log(`==================================== Credentials loaded -------- role: ${this.props.authStore.role}`);
      return setTimeout(() => {
        NavigationService.navigate('TabStu')
      }, 1000);
    }
    return setTimeout(() => {
      console.log(`==================================== Credentials loaded -------- role: ${this.props.authStore.role}`);
      NavigationService.navigate('TabTea')
    }, 1000);
    
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
