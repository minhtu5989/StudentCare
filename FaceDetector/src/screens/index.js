import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import { ExampleScreen } from "./ExampleScreen";
import { CalendarsScreen } from "./CalendarsScreen";
import { DetectorScreen } from "./DetectorScreen";

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
    },{
        initialRouteName: 'CalendarsScreen'
    }
)

export const AppNav = createAppContainer(AppNavigator)
