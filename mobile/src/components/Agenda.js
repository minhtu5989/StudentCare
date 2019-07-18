import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import moment from "moment";
import { Box, Text } from 'react-native-design-utility';
import { observer, inject, } from 'mobx-react';
import { observable } from 'mobx';

import { NavigationService } from '@src/constants/NavigationService';
import { theme } from "../constants/theme";


LocaleConfig.locales['vi'] = {
  monthNames: ['Tháng 1,','Tháng 2,','Tháng 3,','Tháng 4,','Tháng 5,','Tháng 6,','Tháng 7,','Tháng 8,','Tháng 9,','Tháng 10,','Tháng 11,','Tháng 12,'],
  monthNamesShort: ['Tháng 1,','Tháng 2,','Tháng 3,','Tháng 4,','Tháng 5,','Tháng 6,','Tháng 7,','Tháng 8,','Tháng 9,','Tháng 10,','Tháng 11,','Tháng 12,'],
  dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
  dayNamesShort: ['CN','Hai','Ba','Tư','Năm','Sáu','Bảy'],
};
LocaleConfig.defaultLocale = 'vi';

@inject('authStore')
@observer
export class AgendaComponent extends Component {
  @observable date = new Date()
  
  @observable items = {}
  
  @observable selectedMonth = ''

  render() {
    return (
      <Agenda
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.date}
        items={this.items}
        // minDate={'2018-01-01'}
        // maxDate={'2020-01-01'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayChange={(day)=>{console.log('day changed')}}
        onDayPress={(date) => { this.getMonthYear(date.month,date.year); }}
        theme={{
            agendaKnobColor: theme.color.myAppColor,   
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

  componentDidMount = async() => {
    const currentDate = moment(this.date, 'YYYY/MM/DD');
    const month = currentDate.format('MM');
    const year = currentDate.format('YYYY');
    this.getMonthYear(month,year);
  }

  loadItems = async(day) => {
    activity = this.props.authStore.info.dataList
    setTimeout(() => {
      for (let i = -150; i<150; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.items[strTime]) {
          this.items[strTime] = [];
          for (let j = 0; j < activity.length; j++) {
            if(strTime == activity[j].teachingDay){
              this.items[strTime].push({ obj: {...activity[j]} });
            }
          }
        }
      }

      for (let i = 0; i < 60; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.items[strTime]) {
          this.items[strTime] = [];
        }
      }

      const newItems = {};
      Object.keys(this.items).forEach(key => {newItems[key] = this.items[key];});
        this.items = newItems
    }, 500);
    // console.log('==============', this.items)
  }
   
  getMonthYear(M,Y) {
    const month = M - 1;
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    this.selectedMonth = monthNames[month]+' '+Y
  }

  renderItem(item) {
    return (
      <Box shadows={2} style={styles.item} >
        <TouchableOpacity onPress={ () => NavigationService.navigate('Class', {obj: {...item.obj} }) } >
            <Box dir='row'>
              <Text numberOfLines={1} style={{width: '100%'}}>
                <Text weight='bold'>Môn học: </Text> 
                <Text  ml='2xs'>{item.obj.courseName}</Text>  
              </Text>
            </Box>
            <Box dir='row'>
              <Text weight='bold' mr='2xs'>Tiết bắt đầu:</Text>
              <Text>{item.obj.startingSesions} -> { parseInt(item.obj.noOfSecsions) + parseInt(item.obj.startingSesions)}</Text>
            </Box>
            <Box dir='row'>
              <Text weight='bold' mr='2xs'>Phòng:</Text>
              <Text>{item.obj.room}</Text>
            </Box>
            <Box dir='row'>
              <Text weight='bold' mr='2xs'>Lớp:</Text>
              <Text>{item.obj.class}</Text>
            </Box>
        </TouchableOpacity>
      </Box>
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
    backgroundColor: theme.color.greyLightest,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: theme.color.greyLight,
    height: 130,
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
