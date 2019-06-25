import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import MainNav from '../screens/Main'
import CheckAuth from '../screens/CheckAuth'
import AuthStack from '../screens/AuthStack'
import TabNav from '../screens/Tab'

const AppNavigator = createSwitchNavigator(
    {
        CheckAuth: CheckAuth,
        Home:  MainNav,
        Auth: AuthStack,
        Tab: TabNav,
    },{
        initialRouteName: 'CheckAuth'
    }
)

export const AppNav = createAppContainer(AppNavigator)