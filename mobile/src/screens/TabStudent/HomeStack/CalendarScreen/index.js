import React, {Component} from 'react';
import {
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

export default class CalendarScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        rightComponent={logOutBtn}
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
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const logOutBtn = (
  <TouchableOpacity style={{ padding:10 }}>
    <AntDesign name="logout" 
    onPress={async()=> {
      try {
        const credentials = await Keychain.resetGenericPassword();
        if(!credentials) throw new Error
  
        console.log("Credentials Reset !");
        setTimeout(() => {
          NavigationService.navigate('Auth')
        }, 300);
      } catch (err) {
        console.log("Could not load credentials........ Error:", err);
      }
    }} size={23} color={theme.color.white} />
  </TouchableOpacity>
)