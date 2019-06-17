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

export default class AuthStack extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return (
            <Box f={1} center bg={theme.blueLight}>
                <Text>Auth Stack</Text>
            </Box>
        );
    }
}
