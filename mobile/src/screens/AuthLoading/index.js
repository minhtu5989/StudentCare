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

export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return (
            <Box f={1} center bg={theme.blueLight}>
                <Text>AuthLoading</Text>
            </Box>
        );
    }

    // async componentDidMount() {
    //     const { navigation } = this.props

    //     // Get token from storage
    //     const tokenStorage = await AsyncStorage.getItem(storageKey.token)

    //     // Check token in storage
    //     if (tokenStorage && tokenStorage !== null) {
    //         // if exist ---> Main
    //         navigation.navigate('Main')
    //     } else {
    //         // else (no exist) ---> Auth
    //         navigation.navigate('Auth')
    //     }
    // };
}
