import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import MainNav from '../screens/Main'
import CheckAuth from '../screens/CheckAuth'
import AuthStack from '../screens/Authentification'
import TabNav from '../screens/Tab'

const AppNavigator = createSwitchNavigator(
    {
        CheckAuth: CheckAuth,
        Main:  MainNav,
        Auth: AuthStack,
        Tab: TabNav,
    },{
        initialRouteName: 'CheckAuth'
    }
)

export const AppNav = createAppContainer(AppNavigator)