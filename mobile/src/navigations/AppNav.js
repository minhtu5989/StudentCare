import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import HomeNav from '../screens/Home'
import CheckAuth from '../screens/CheckAuth'
import AuthStack from '../screens/Authentification'
import TabNav from '../screens/Tab'

const AppNavigator = createSwitchNavigator(
    {
        CheckAuth: CheckAuth,
        Home:  HomeNav,
        Auth: AuthStack,
        Tab: TabNav,
    },{
        initialRouteName: 'CheckAuth'
    }
)

export const AppNav = createAppContainer(AppNavigator)