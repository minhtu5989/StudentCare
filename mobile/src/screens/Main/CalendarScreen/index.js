import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import { Button } from 'react-native-elements';
import { Agenda } from "../../../components";
import moment from 'moment';
import { theme } from '../../../constants/theme';
import { NavigationService } from '../../../constants/NavigationService';
import { api } from "../../../api/ApiConfig";

export  class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <View style={styles.container}>
        <Agenda/>
        {
          this.getDates('01-01-2019','01-03-2019')
        }
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
        console.log('====================================');
        console.log('Verify succussfel !');
        console.log('====================================');
      } else {
        console.log("No credentials stored.");
        NavigationService.navigate('Auth')
      }
    } catch (err) {
      console.log("Could not load credentials........ Error:", err);
    }


    const resTKB = await api.GetTKB 
      .headers({
          "Content-Type": "application/json",
      })
      .get()
      .error( e => {
          console.log('error', e);
      })
      .json()

    if(!res) return alert('Phát hiện lỗi không kết nối internet.');
    console.log('response', res);

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

  getDates = (startDate, stopDate) => {
    var startDate = startDate.split("-").reverse().join("-");
    var stopDate = stopDate.split("-").reverse().join("-");

    var dateRange = [];
    var startDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (startDate <= stopDate) {
      if(moment(startDate).format('dddd') == "Monday"){

        dateRange.push( moment(startDate).format('YYYY-MM-DD') )
      }
      startDate = moment(startDate).add(1, 'days');
    }
    return console.log('array: ', dateRange);
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