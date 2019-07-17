
import React, { Component } from 'react'
// import { TouchableHightLight, Text, View } from 'react-native';
// import AtoZListView from 'react-native-atoz-listview';
// import Search from 'react-native-search-box';
import { Box, Text } from 'react-native-design-utility'
import { observer, inject, } from 'mobx-react';
import { observable } from 'mobx';

import { Header } from "@src/commons";
import { theme } from '@src/constants/theme';

@inject('stuStore')
@observer
export default class SearchStuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header
              title='Đặt ảnh gốc'
            />
          )
    });
    

    componentDidMount = () => {
        this.fetchStu();
    }

    // @action.bound
    fetchStu = async () => {
        try {
            // this.isLoading = true
            await this.props.stuStore.getStu()
            // this.isLoading = false
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <Box f={1} center bg={theme.blueLight}>
                {console.log('asd', this.props.stuStore.students)}
            </Box>
        );
    }
}
