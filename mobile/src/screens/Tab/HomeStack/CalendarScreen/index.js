import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Button } from 'react-native-elements';
import { AgendaComponent } from "../../../../components/Agenda";
import { theme } from '../../../../constants/theme';
import { NavigationService } from '../../../../constants/NavigationService';
import { Header } from "../../../../commons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isEmptyStatement } from '@babel/types';

export default class CalendarScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        rightComponent={
          <TouchableOpacity style={{ padding:10 }}>
            <AntDesign name="logout" size={23} color={theme.color.white} />
          </TouchableOpacity>
        }
        leftComponent
        title='Thời khoá biểu'
      />
    )
  });

  

  render() {
    return (
      <View style={styles.container}>
        <AgendaComponent/>
        <Button
          title="exit"
          onPress={()=> this._logOut}
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
      const credentials = await Keychain.resetGenericPassword();
      if(!credentials) throw new Error

      console.log("Credentials Reset !");
      setTimeout(() => {
        NavigationService.navigate('CheckAuth')
      }, 300);
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