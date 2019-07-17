
import React, { Component } from 'react'
// import { TouchableHightLight, Text, View } from 'react-native';
// import AtoZListView from 'react-native-atoz-listview';
// import Search from 'react-native-search-box';
import { Box, Text } from 'react-native-design-utility'
import { observer, inject, } from 'mobx-react';
import { observable } from 'mobx';
import { Button, Avatar } from "react-native-elements";

import { Header } from "@src/commons";
import { theme } from '@src/constants/theme';

@inject('stuStore')
@observer
export default class StuInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { dataStu: null };
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header
              title='Đặt ảnh gốc'
            />
          )
    });

    render() {
        const {student} = this.props.stuStore
        return (
            <Box f={1} center bg={theme.blueLight}>
                <Box f={1} width='100%' p='xs' center >
                    <Box center f={2}>
                        <Avatar 
                            source={require('../../../../assets/images/icons/MaleStudent.png')}
                            showEditButton
                            size="large"
                            rounded
                            activeOpacity={0.7}
                            title="TL"
                            onPress={() => alert('Update avatar is not available')}
                        />
                        <Text mt='sm'>Sinh Viên: {student.holotvn} {student.tenvn}</Text>
                    </Box>
                    <Box mt='lg' f={5} >
                        <Box f={1} w={theme.width*0.9}>
                            <Box >
                                <Text mt='xs' numberOfLines={1} style={{width: '100%'}}>
                                    <Text weight='bold'>MSSV: </Text> 
                                    <Text >{student.userName}</Text>  
                                </Text>
                            </Box>
                            <Box dir='row' mt='xs'>
                                <Text weight='bold' mr='2xs'>Ngày sinh:</Text>
                                <Text>{student.ngaysinh}</Text>
                            </Box>
                            <Box dir='row' mt='xs'>
                                <Text weight='bold' mr='2xs'>Quê quán:</Text>
                                <Text>{student.tenns}</Text>
                            </Box>
                            <Box dir='row' mt='xs'>
                                <Text weight='bold' mr='2xs'>SĐT:</Text>
                                <Text>{student.mobile}</Text>
                            </Box><Box dir='row' mt='xs'>
                                <Text weight='bold' mr='2xs'>Email:</Text>
                                <Text>{student.email}</Text>
                            </Box>
                            <Box mt='lg' center>
                                <Button
                                    title="Đặt ảnh gốc"
                                    onPress={ () => {
                                        NavigationService.navigate('Detector')
                                    } }
                                    buttonStyle={{margin: 20, width: theme.width*0.7, backgroundColor: '#25c73a'}}
                                />
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
        );
    }
}
