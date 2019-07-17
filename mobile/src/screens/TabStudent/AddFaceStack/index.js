import { createAppContainer, createStackNavigator } from 'react-navigation'

import AddFaceScreen from "./AddFace";
import SearchStuScreen from "./SearchStu";

const AddFaceStack = createStackNavigator(
    {
        AddFace: {
            screen : AddFaceScreen
        },
        SearchStu: {
            screen : SearchStuScreen
        },
    },{
        initialRouteName: 'SearchStu',
        headerMode: 'screen',
        mode: 'card',
    }
)

export default createAppContainer(AddFaceStack)
