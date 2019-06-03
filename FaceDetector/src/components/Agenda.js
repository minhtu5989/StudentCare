import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
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
      {ActivityStartDate: '2019-06-03', Subject: {courseName: 'Programming Techniques', startingSession: '7 -> 12', room: 'B.06.09', class: '16DNCQA1'}},
      {ActivityStartDate: '2019-06-04', Subject: {courseName: 'Practice: Graph Theory', startingSession: '12 -> 15', room: 'B.06.09', class: '17DNCQA2'}},
      {ActivityStartDate: '2019-06-05', Subject: {courseName: 'Toán', startingSession: '12 -> 15', room: 'B.06.09', class: '17DNCQA2'}},
      {ActivityStartDate: '2019-06-07', Subject: {courseName: 'Lý', startingSession: '12 -> 15', room: 'B.06.09', class: '17DNCQA2'}},
      {ActivityStartDate: '2019-06-09', Subject: {courseName: 'Hoá', startingSession: '12 -> 15', room: 'B.06.09', class: '17DNCQA2'}}
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
        // loadItemsForMonth={this.loadItemsForMonth(this.state.date)}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.state.date}
        items={this.state.items}
        minDate={'2018-01-01'}
        maxDate={'2020-01-01'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayChange={(day)=>{console.log('day changed')}}
        onDayPress={(date) => { this.getMonthYear(date.month,date.year); }}
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
            borderRadius: 16,
            borderColor: theme.color.greyLight,
            // height: 350,
            width: theme.width*0.9
          }}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let j = 0; j < activity.length ; j++) {
        const strTime = this.timeToString(activity[j].ActivityStartDate);
        if (!this.state.items[strTime]){
          this.state.items[strTime] = []; 

          this.state.items[strTime].push({ obj: activity[j].Subject });
        }
      }

      for (let i = -90; i < 120; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
      console.log(this.state.items);
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
      <TouchableOpacity style={styles.item} >
        <Text>Môn học:   {item.obj.courseName}</Text>
        <Text>Tiết bắt đầu:   {item.obj.startingSession}</Text>
        <Text>Phòng:   {item.obj.room}</Text>
        <Text>Lớp:   {item.obj.class}</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    backgroundColor: '#e6f7ff',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderWidth: 1,
    borderColor: theme.color.greyLight,
    height: 100
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