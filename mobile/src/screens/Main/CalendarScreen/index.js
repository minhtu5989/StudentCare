import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import { AgendaComponent } from "../../../components/Agenda";
import moment from 'moment';


export  class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { };
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

  render() {
    return (
      <View style={styles.container}>
        <AgendaComponent/>
        {
          this.getDates('01-01-2019','01-03-2019')
        }
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