import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Agenda} from 'react-native-calendars';

import moment from "moment";
import { NavigationService } from '@src/constants/NavigationService';
import { theme } from "@src/constants/theme";
import { api } from "../../api/ApiConfig";

class AgendaComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      items:{},
      selectedMonth:''
    };
    activity = [ 
      {ActivityStartDate: '2019-03-11', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673',courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-25', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673',courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-04', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673',courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-27', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673',courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-20', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673',courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-06', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673',courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-18', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673',courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-14', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '4 -> 7', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673', courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-07', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '1 -> 3', room: 'B.06.09', class: '16DNCQA1', lectureCode: 'NHH0200673', courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-13', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '3 -> 6', room: 'B.06.10', class: '15DNCQA3', lectureCode: 'NHH0200673', courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-21', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '7 -> 9', room: 'A.08.11', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-03-18', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Bank Marketing', startingSession: '12 -> 15', room: 'B.06.10', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN125'}},
      {ActivityStartDate: '2019-02-11', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '1 -> 3', room: 'E.06.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'}},
      {ActivityStartDate: '2019-02-04', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-11', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-06', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-15', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-08', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-13', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-20', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-18', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-22', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-25', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-02-27', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'Principles of Accounting', startingSession: '2 -> 5', room: 'E.03.09', class: '17DNCQA2', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-06-23', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'A', startingSession: '1 -> 5', room: 'E.1', class: 'C', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },
      {ActivityStartDate: '2019-06-23', Subject: {lecture: 'ThS. Võ Xuân Lộc', courseName: 'B', startingSession: '5 -> 10', room: 'E.2', class: 'D', lectureCode: 'NHH0200673', courseCode: 'MAN155'} },

    ]
  }

  componentWillMount = async () => {
    const currentDate = moment(this.state.date, 'YYYY/MM/DD');
    const month = currentDate.format('MM');
    const year = currentDate.format('YYYY');
    this.getMonthYear(month,year);

    this._fetchTKB()
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

  _fetchTKB = async() => {
    try {
      await api.GetTKB 
      .headers({
          "Content-Type": "application/json",
      })
      .get()
      .json( json => {
        let data = json.dataExcel
        let dataFilter = []
        data.forEach( el => {
          if(el.email == 'nguyenthienthanh2012@yahoo.com.vn')
            dataFilter.push(el)
        })
        // npt.luu@hutech.edu.vn

        // console.log('data=======================', dataFilter)   
        
        let result = []
        // var singleData = Object.assign({}, dataFilter[0]);
        // delete singleData.timeable

        dataFilter.forEach( el =>{
          const timeable = JSON.stringify(el.timeable)

          //========================== minus 1 because moment().isoWeekday() returns 1-7 where 1 is Monday and 7 is Sunday
          const weekday = parseInt(el.weekday) - 1
          let startDate = timeable.slice(1,9)
          yy = startDate.slice(6,8)
          startDate = startDate.slice(0,6)
          startDate = startDate + 20 + yy

          let stopDate = timeable.slice(12, 20) 
          yy = stopDate.slice(6,8)
          stopDate = stopDate.slice(0,6)
          stopDate = stopDate + 20 + yy
          // console.log(`startDate ${startDate} stopDate ${stopDate}`);

          const dateRange = this._getDatesRange(startDate, stopDate, weekday)
          console.log('dateRange-===========',dateRange);
          
          dateRange.forEach( el2 => {
            el = { ...el, teachingDay: el2 }
            result.push(el)
          })
          console.log('result-===========',result);
        })
      })
    } catch (error) {
        console.log('................Error:   ', error)
    }
  }

  _getDatesRange = (startDate, stopDate, weekDay) => {
    var startDate = startDate.split("/").reverse().join("-");
    var stopDate = stopDate.split("/").reverse().join("-");

    var dateRange = [];
    var startDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (startDate <= stopDate) {
      if(moment(startDate).isoWeekday() == weekDay){

        dateRange.push( moment(startDate).format('YYYY-MM-DD') )
      }
      startDate = moment(startDate).add(1, 'days');
    }
    return dateRange
  }

  loadItems(day) {
    setTimeout(() => {
      for (let j = 0; j < activity.length ; j++) {
        const strTime = this.timeToString(activity[j].ActivityStartDate);
        if (!this.state.items[strTime]){
          this.state.items[strTime] = []; 
          this.state.items[strTime].push({ obj: activity[j].Subject });
          for (let j = 0; j < activity.length ; j++) {
            if(this.state.items[strTime] == activity[j].ActivityStartDate){
              this.state.items[strTime].push({ obj: activity[j].Subject });
            }
          }
        }
      }

      for (let i = -30; i < 30; i++) {
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
      <TouchableOpacity style={styles.item} onPress={ () => NavigationService.navigate('Class', {obj: item.obj}) } >
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



export default AgendaComponent