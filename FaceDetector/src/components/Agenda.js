import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from "moment";

import { theme } from "../constants/theme";

export class AgendaComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      items:{},
      selectedMonth:''
    };
    activity = [ 
      {ActivityStartDate: '2019-06-01', Subject: {courseName: 'Tourism Sites Management', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1'}},
      {ActivityStartDate: '2019-06-02', Subject: {courseName: 'English Reading 1', startingSession: '4 -> 7', room: 'B.06.09', class: '16DNCQA1'}},
      {ActivityStartDate: '2019-06-03', Subject: {courseName: 'Practice: Advanced Programming Techniques', startingSession: '7 -> 12', room: 'B.06.09', class: '16DNCQA1'}},
      {ActivityStartDate: '2019-06-04', Subject: {courseName: 'Practice: Graph Theory', startingSession: '12 -> 15', room: 'B.06.09', class: '17DNCQA2'}}
    ]
  }

  componentWillMount() {
    const currentDate = moment(this.state.date, 'YYYY/MM/DD');
    const month = currentDate.format('M');
    const year = currentDate.format('YYYY');
    this.getMonthYear(month,year);
  }

  render() {
    return (
      <Agenda
        loadItemsForMonth={this.loadItemsForMonth(this.state.date)}
        selected={this.state.date}
        // items={this.state.items}
        items={this.state.items}
        minDate={'2016-01-01'}
        maxDate={'2022-01-01'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayChange={(day)=>{console.log('day changed')}}
        onDayPress={(date) => { this.getMonthYear(date.month,date.year); }}
        // renderEmptyData = {() => {return (<View />);}}    
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        //  monthFormat={'yyyy'}
        theme={{
            agendaKnobColor: 'green',
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: 'black',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#00adf5',
            monthTextColor: '#00adf5',
            textDayFontFamily: 'Cochin',
            textMonthFontFamily: 'Cochin',
            textDayHeaderFontFamily: 'Cochin',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 15,
            // textDisabledColor: 'red',
            'stylesheet.calendar.header': {
              week: {
                // marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderBottomWidth: 1,
                borderColor: theme.color.greyLight,
              }
            }
          }}
          style={{
            flex: 1, 
            borderWidth: 1,
            paddingTop: 5,
            borderColor: theme.color.black,
            // height: 350,
            width: theme.width*0.9
          }}
      />
    );
  }
   
  loadItemsForMonth(day) {
    setTimeout(() => {
      // for (let i = -15; i < 85; i++) {
      //   // const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(day);
      //   if (!this.state.items[strTime]) {
      //     this.state.items[strTime] = [];
      //     for (let j = 0; j < activity.length; j++) {
      //       this.state.items[strTime].push({
      //         name: 'Item for ' + strTime,
      //       });
      //     }
      //   }
      // }
      // //console.log(this.state.items);
      // const newItems = {};
      // Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      // this.setState({
      //   items: newItems
      // });



      for (let i = 0; i < activity.length; i++) {
        const strTime = this.timeToString(activity[i].ActivityStartDate);
        if (!this.state.items[strTime]){
          this.state.items[strTime] = [];              
        }
         this.state.items[strTime].push({
          name: activity[i].Subject.courseName               
        });
      }

      console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    console.log(`Load Items for ${day.year}-${day.month}`);
  }

  getMonthYear(M,Y) {
    const month = M - 1;
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    this.setState({selectedMonth: monthNames[month]+' '+Y, showMonth: true });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: 100}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return ( 
      <View style={styles.emptyDate}><Text style={{color: theme.color.greyLight}}>(Trống)</Text></View> 
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderWidth: 1,
    borderColor: theme.color.greyLight
  },
  calendar: {
    borderWidth: 1,
    paddingTop: 5,
    borderColor: 'lightblue',
    height: 350,
    width: 350
  },
  emptyDate: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
    flex:1,
    paddingTop: 30
  }
});