import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import {Calendar, Agenda} from 'react-native-calendars';

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['vn'] = {
  monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  dayNames: ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'],
  dayNamesShort: ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'],
//   today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'vn';

export  class CalendarsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentDay: new Date()
    };
    styleDot=[
        {key: 'vacation', color: 'red', selectedDotColor: 'white'}
    ]

    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>

        <Calendar
          style={styles.calendar}
          current={this.state.currentDay}
          markingType={'multi-dot'}
          markedDates={{
            [this.state.currentDay]: {selected: true, selectedDotColor: '#00adf5'},
            [this.state.selected]: {selected: true, selectedDotColor: '#00adf5'},
            
            '2019-05-15': {dots: styleDot},
            '2019-05-16': {dots: styleDot},
            '2019-05-17': {dots: styleDot},
            '2019-05-18': {dots: styleDot},
            '2019-05-19': {dots: styleDot},
            '2019-05-20': {dots: styleDot},
            '2019-05-21': {dots: styleDot},
            '2019-05-22': {dots: styleDot},
            '2019-05-23': {dots: styleDot},
            '2019-05-24': {dots: styleDot},
            '2019-05-25': {dots: styleDot},
            '2019-05-26': {dots: styleDot},
            '2019-05-27': {dots: styleDot},
            '2019-05-28': {dots: styleDot},
            '2019-05-29': {dots: styleDot},

          }}
          theme={{
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
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }
            }
          }}
          hideArrows={false}
          onDayPress={this.onDayPress}
          onDayLongPress={(day) => {console.log('selected day', day)}}
          monthFormat={'MM / yyyy'}
          onMonthChange={(month) => {console.log('month changed', month)}}
        //   renderArrow={(direction) => (<Arrow  />)}
        />
      </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    if(day > 15 && day <29)
    alert('Hôm nay bạn có môn học Toán Cao Cấp')
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    paddingTop: 5,
    borderColor: 'lightblue',
    height: 350,
    width: 350
  },
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