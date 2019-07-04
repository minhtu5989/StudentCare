import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import CheckAuth from '../screens/CheckAuth'
import AuthStack from '../screens/AuthStack'
import TabTeacher from '../screens/Tab'
import TabStuent from '../screens/TabStudent'

const AppNavigator = createSwitchNavigator(
    {
        CheckAuth: CheckAuth,
        Auth: AuthStack,
        TabTea: TabTeacher,
        TabStu : TabStuent,
    },{
        initialRouteName: 'CheckAuth'
    }
)

export const AppNav = createAppContainer(AppNavigator)