import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import { Button } from 'react-native-elements';
import { Agenda } from "../../../components";
import { theme } from '../../../constants/theme';
import { NavigationService } from '../../../constants/NavigationService';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

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
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});