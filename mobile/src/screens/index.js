import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import { ExampleScreen } from "./ExampleScreen";
import { CalendarsScreen } from "./CalendarsScreen";
import { DetectorScreen } from "./DetectorScreen";
import { ClassScreen } from "./ClassScreen";


const AppNavigator = createSwitchNavigator(
    {
        ExampleScreen: {
            screen : ExampleScreen
        },
        CalendarsScreen: {
            screen : CalendarsScreen
        },
        DetectorScreen: {
            screen : DetectorScreen
        },
        ClassScreen: {
            screen : ClassScreen
        },
    },{
        initialRouteName: 'CalendarsScreen'
    }
)

export const AppNav = createAppContainer(AppNavigator)


