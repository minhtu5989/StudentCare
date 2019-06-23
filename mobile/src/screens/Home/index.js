import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import { CalendarsScreen } from "./CalendarScreen/index";
import { DetectorScreen } from "./DetectorScreen/index";
import { ClassScreen } from "./ClassScreen/index";
import { AddFaceScreen } from "./AddFaceScreen/index";

const HomeNavigator = createStackNavigator(
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
        AddFace: {
            screen : AddFaceScreen
        },
    },{
        initialRouteName: 'Calendars',
        headerMode: 'none',
        // mode: 'modal',
    }
)

export default HomeNav = createAppContainer(HomeNavigator)
