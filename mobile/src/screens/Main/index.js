import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import { ExampleScreen } from "./ExampleScreen";
import { CalendarsScreen } from "./CalendarScreen/index";
import { DetectorScreen } from "./DetectorScreen/index";
import { ClassScreen } from "./ClassScreen/index";


const MainNavigator = createStackNavigator(
    {
        ExampleScreen: {
            screen : ExampleScreen
        },
        DetectorScreen: {
            screen : DetectorScreen
        },
        CalendarsScreen: {
            screen : CalendarsScreen
        },
        ClassScreen: {
            screen : ClassScreen
        },
    },{
        initialRouteName: 'DetectorScreen',
        headerMode: 'none'
    }
)

export default MainNav = createAppContainer(MainNavigator)