import { createAppContainer, createBottomTabNavigator } from 'react-navigation'

import HomeStack from "./HomeStack";
// import ProfileScreen from "./Settings/ProfileScreen";
import AddFaceScreen from "./AddFaceScreen";
import { theme } from "../../constants/theme";

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack, 
        AddFace: AddFaceScreen, 
        // Profile: ProfileScreen, 
    },
    {
        initialRouteName: 'Home',
        order: [ 'Home', 'AddFace', ],
        animationEnabled: true,
        swipeEnabled: false,
        lazy: true,
        tabBarOptions: { 
            // pressColor: 'white',
            showIcon: true, 
            showLabel: true,
            labelStyle:{
                fontSize: 10,
                // fontFamily: 
                marginBottom: 6
            },
            activeTintColor: theme.color.blueDark, 
            inactiveTintColor: theme.color.greyDarkest,
            // inactiveBackgroundColor: theme.color.greyLighter,
            activeBackgroundColor: theme.color.greyLighter,
            style:{
                height: 50,
                // paddingBottom: 5,
                backgroundColor: theme.color.greyLightest,
                borderTopWidth: 0.3,
                borderTopColor:'gray',
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: -1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        },
    } 
)

export default TabNav = createAppContainer(TabNavigator)
