import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import { AgendaComponent } from "../../../../components/Agenda";
import { theme } from '../../../../constants/theme';
import { NavigationService } from '../../../../constants/NavigationService';
import { Header } from "../../../../commons";
import AntDesign from 'react-native-vector-icons/AntDesign';

const rightBtn = (
  <TouchableOpacity style={{ padding:10 }}>
    <AntDesign name="logout" 
    onPress={async()=> {
      try {
        const credentials = await Keychain.resetGenericPassword();
        if(!credentials) throw new Error
  
        console.log("Credentials Reset !");
        setTimeout(() => {
          NavigationService.navigate('CheckAuth')
        }, 300);
        alert('Đăng xuất')
      } catch (err) {
        console.log("Could not load credentials........ Error:", err);
      }
    }} size={23} color={theme.color.white} />
  </TouchableOpacity>
)
export default class CalendarScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        rightComponent={rightBtn}
        leftComponent
        title='Thời khoá biểu'
      />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <AgendaComponent/>
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