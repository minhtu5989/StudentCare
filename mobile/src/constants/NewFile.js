import React, { Component } from 'react'
import { 
    Dimensions, 
    Image,
    Alert,
    Platform,
    StyleSheet, 
} from 'react-native';
import { Box, Text } from 'react-native-design-utility'

import { theme } from '@src/constants/theme';


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
            <Box f={1} center bg={theme.blueLight}>
                <Text>this is NewFile</Text>
            </Box>
        );
    }
}
