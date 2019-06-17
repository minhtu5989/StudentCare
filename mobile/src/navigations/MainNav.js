import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import { ExampleScreen } from "../screens/Main/ExampleScreen";
import { CalendarsScreen } from "../screens/Main/CalendarScreen/index";
import { DetectorScreen } from "../screens/Main/DetectorScreen/index";
import { ClassScreen } from "../screens/Main/ClassScreen/index";


const MainNavigator = createStackNavigator(
    {
        ExampleScreen: {
            screen : ExampleScreen
        },
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

export const MainNav = createAppContainer(MainNavigator)