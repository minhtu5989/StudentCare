import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import MainNav from '../screens/Main'
import AuthLoading from '../screens/AuthLoading'
import AuthStack from '../screens/Authentification'
import TabNav from '../screens/Tab'

const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Main:  MainNav,
        Auth: AuthStack,
        Tab: TabNav,
    },{
        initialRouteName: 'AuthLoading'
    }
)

export const AppNav = createAppContainer(AppNavigator)