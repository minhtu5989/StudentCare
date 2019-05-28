import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import { ExampleScreen } from "./ExampleScreen";
import { CalendarsScreen } from "./CalendarsScreen";
import { newExScreen } from "./newExScreen";
import { DetectorScreen } from "./DetectorScreen";

const AppNavigator = createSwitchNavigator(
    {
        ExampleScreen: {
            screen : ExampleScreen
        },
        CalendarsScreen: {
            screen : CalendarsScreen
        },
        newExScreen: {
            screen : newExScreen
        },
        DetectorScreen: {
            screen : DetectorScreen
        },
    },{
        initialRouteName: 'DetectorScreen'
    }
)

export const AppNav = createAppContainer(AppNavigator)
