import { createAppContainer, createStackNavigator } from 'react-navigation'

import CalendarsScreen from "./CalendarScreen";
import DetectorScreen from "./DetectorScreen";
import ClassScreen from "./ClassScreen";


const HomeStack = createStackNavigator(
    {
        Calendars: {
            screen : CalendarsScreen
        },
        Detector: {
            screen : DetectorScreen
        },
        Class: {
            screen : ClassScreen
        },
    },{
        initialRouteName: 'Calendars',
        headerMode: 'screen',
        mode: 'modal',
    }
)

export default createAppContainer(HomeStack)
