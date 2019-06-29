import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import * as Keychain from 'react-native-keychain';
import moment from "moment";

import { NavigationService } from '@src/constants/NavigationService';
import { theme } from "../constants/theme";
import { api } from "../api/ApiConfig";


LocaleConfig.locales['vi'] = {
  monthNames: ['Tháng 1,','Tháng 2,','Tháng 3,','Tháng 4,','Tháng 5,','Tháng 6,','Tháng 7,','Tháng 8,','Tháng 9,','Tháng 10,','Tháng 11,','Tháng 12,'],
  monthNamesShort: ['Tháng 1,','Tháng 2,','Tháng 3,','Tháng 4,','Tháng 5,','Tháng 6,','Tháng 7,','Tháng 8,','Tháng 9,','Tháng 10,','Tháng 11,','Tháng 12,'],
  dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
  dayNamesShort: ['CN','Hai','Ba','Tư','Năm','Sáu','Bảy'],
};
LocaleConfig.defaultLocale = 'vi';

export class AgendaComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      items:{},
      selectedMonth:''
    };
  }

  componentWillMount = async () => {
    const currentDate = moment(this.state.date, 'YYYY/MM/DD');
    const month = currentDate.format('MM');
    const year = currentDate.format('YYYY');
    this.getMonthYear(month,year);
  }

  render() {
    return (
      <Agenda
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
            agendaKnobColor: theme.color.green,   
            backgroundColor: theme.color.white,   
            calendarBackground: theme.color.white,
            textSectionTitleColor: theme.color.black,
            selectedDayBackgroundColor: theme.color.myAppColor,
            selectedDayTextColor: theme.color.white,
            todayTextColor: theme.color.myAppColor,
            dayTextColor: theme.color.dayTextColor,
            textDisabledColor: theme.color.greyLight,
            dotColor: theme.color.myAppColor,
            selectedDotColor: theme.color.white,
            arrowColor: theme.color.myAppColor,
            monthTextColor: theme.color.myAppColor,
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
      const credentials = await Keychain.getGenericPassword();
      
      if (credentials) {
        console.log('==================================== Verify successful !');
      } else {
        console.log("No credentials stored.");
      }

      res = await api.GetTKB 
      .headers({ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.password}` 
      })
      .get()
      .json()

      return res.userInfo.data

    } catch (error) {
        console.log('................Error:   ', error)
        return alert('Phát hiện lỗi Internet')
    }
  }


  loadItems= async(day) => {
    let activity = await this._fetchTKB()
    if(!activity) return 
    setTimeout(() => {
      for (let i = -365; i<365; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          for (let j = 0; j < activity.length; j++) {
            if(strTime == activity[j].teachingDay){
              this.state.items[strTime].push({ obj: {...activity[j]} });
            }
          }
        }
      }

      for (let i = 0; i < 60; i++) {
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
    }, 500);
    console.log('==============', this.state.items)
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
        <Text>Tiết bắt đầu:   {item.obj.startingSesions} -> {item.obj.noOfSecsions + item.obj.startingSesions} </Text>
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
    backgroundColor: theme.color.white,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderWidth: 1,
    borderColor: theme.color.greyLight,
    height: 145
  },
  calendar: {
    borderWidth: 1,
    paddingTop: 5,
    borderColor: theme.color.myAppColor,
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
