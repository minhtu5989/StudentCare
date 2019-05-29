import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import { CalendarsComponent } from "../components/Calendars";
import { AgendaComponent } from "../components/Agenda";

export  class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <CalendarsComponent/> */}
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
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});