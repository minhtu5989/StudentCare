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


export class NewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return (
            <Box f={1} bg={theme.blueLight}>
                <Text>this is NewFile</Text>
            </Box>
        );
    }
}
