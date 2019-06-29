import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import { Button } from 'react-native-elements';
import { Agenda } from "../../../../components";
import { theme } from '../../../../constants/theme';
import { NavigationService } from '../../../../constants/NavigationService';
import { Header } from 'react-native-elements';
import IconVector from 'react-native-vector-icons/Ionicons';

const leftIcon = <IconVector name="ios-arrow-back" size={40} color={theme.color.white} />

export default class CalendarScreen extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        containerStyle={{
          backgroundColor: '#3D6DCC',
          justifyContent: 'space-around',
        }}
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        // leftComponent={leftIcon}
        centerComponent={{ text: 'Thời khoá biểu', style: { color: '#fff', fontWeight:'800', fontSize: 17, } }}
      />
    )
  });

  

  render() {
    return (
      <View style={styles.container}>
        <Agenda/>
        <Button
          title='Đăng xuất'
          onPress={this._logOut}
          buttonStyle={{margin: 10, padding: 8, backgroundColor: theme.color.danger}}
        />
      </View>
    );
  }

  componentDidMount = async() => {

    //=========================VERYFFI TOKEN
    try {
      const credentials = await Keychain.getGenericPassword();
      
      if (credentials) {
        console.log('==================================== Verify successful !');
      } else {
        console.log("No credentials stored.");
        NavigationService.navigate('CheckAuth')
      }
    } catch (err) {
      console.log("Could not load credentials........ Error:", err);
    }

  }

  _logOut = async() => {
    try {
      const response = await Keychain.resetGenericPassword();
      if(response){
        this.setState({status: 'Credentials Reset!'});
        console.log("Credentials Reset !");
      }

      setTimeout(() => {
        NavigationService.navigate('CheckAuth')
      }, 1000);
    } catch (err) {
      console.log("Could not load credentials........ Error:", err);
    }
  }

}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});