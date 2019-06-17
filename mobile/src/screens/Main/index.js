import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import { CalendarsScreen } from "./CalendarScreen/index";
import { DetectorScreen } from "./DetectorScreen/index";
import { ClassScreen } from "./ClassScreen/index";


const MainNavigator = createStackNavigator(
    {
        DetectorScreen: {
            screen : DetectorScreen
        },
        CalendarsScreen: {
            screen : CalendarsScreen
        },
        ClassScreen: {
            screen : ClassScreen
        },
    },{
        initialRouteName: 'DetectorScreen',
        headerMode: 'none'
    }
)

export default MainNav = createAppContainer(MainNavigator)
