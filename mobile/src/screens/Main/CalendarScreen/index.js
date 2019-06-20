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
          title='Log Out'
          onPress={this._logOut}
          buttonStyle={{margin: 10, padding: 5, backgroundColor: theme.color.danger}}
        />
      </View>
    );
  }

  componentDidMount = async() => {

    // SET token from storage
    try {
      const credentials = await Keychain.setGenericPassword(
        'token',
        'TuLuong283',
        { accessControl: this.state.accessControl }
      );
      if(credentials){
        this.setState({ status: 'Credentials saved!' });
        console.log('Status: ', this.state.status);
      }
    } catch (err) {
      this.setState({ status: 'Could not save credentials, ' + err });
      console.log("Status: ", this.state.status);

    }
  }

  _logOut = async() => {
    try {
      const response = await Keychain.resetGenericPassword();
      if(response){
        this.setState({status: 'Credentials Reset!'});
        console.log("Status: ", this.state.status);
      }

      NavigationService.navigate('CheckAuth')
    } catch (err) {
      this.setState({ status: 'Could not reset credentials, ' + err });
      console.log("Status: ", this.state.status);
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