import React, { Component } from 'react'
import { 
    Dimensions, 
    Image,
    Alert,
    Platform,
    StyleSheet, 
} from 'react-native';
import { Box, Text } from 'react-native-design-utility'

import { theme } from '@constants/theme';
// import { MyButton } from '@commons/MyButton';
// import { NavigationService } from '@api/NavigationService';
import { EvilIcons } from '@expo/vector-icons';


export class NewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'NewFile',
    });

    render() {
        return (
            <Box f={1} bg={theme.blueLight}>
                <Text>this is NewFile</Text>
                <EvilIcons name="user" color={theme.color.myAppColor} size={35} />
            </Box>
        );
    }
}
