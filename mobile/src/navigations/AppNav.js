import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import CheckAuth from '../screens/CheckAuth'
import AuthStack from '../screens/AuthStack'
import TabNav from '../screens/Tab'

const AppNavigator = createSwitchNavigator(
    {
        CheckAuth: CheckAuth,
        Auth: AuthStack,
        Tab: TabNav,
    },{
        initialRouteName: 'Auth'
    }
)

export const AppNav = createAppContainer(AppNavigator)