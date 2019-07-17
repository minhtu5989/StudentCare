import { createAppContainer, createStackNavigator } from 'react-navigation'

import AddFaceScreen from "./AddFace";
import StuInfoSrceen from "./StuInfo";

const AddFaceStack = createStackNavigator(
    {
        AddFace: {
            screen : AddFaceScreen
        },
        StuInfo: {
            screen : StuInfoSrceen
        },
    },{
        initialRouteName: 'StuInfo',
        headerMode: 'screen',
        mode: 'card',
    }
)

export default createAppContainer(AddFaceStack)
