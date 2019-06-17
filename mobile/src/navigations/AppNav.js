import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import { MainNav } from './MainNav'

const AppNavigator = createSwitchNavigator(
    {
        Main: {
            screen : MainNav
        },
        // CalendarsScreen: {
        //     screen : CalendarsScreen
        // },
    },{
        initialRouteName: 'Main'
    }
)

export const AppNav = createAppContainer(AppNavigator)