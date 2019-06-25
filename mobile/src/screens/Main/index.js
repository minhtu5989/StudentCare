import { createAppContainer, createStackNavigator } from 'react-navigation'

import CalendarsScreen from "./Home";
import DetectorScreen from "./DetectorScreen";
import ClassScreen from "./ClassScreen";
import AddFaceScreen from "./AddFaceScreen";

const MainNavigator = createStackNavigator(
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

export default MainNav = createAppContainer(MainNavigator)
