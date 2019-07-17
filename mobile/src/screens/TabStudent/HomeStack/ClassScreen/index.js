import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { Button, Avatar } from "react-native-elements";

import { theme } from '../../../../constants/theme';
import { NavigationService } from '../../../../constants/NavigationService';
import { Header } from "../../../../commons";
import { api } from "../../../../api/ApiConfig";

export default class ClassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        obj = this.props.navigation.getParam('obj')
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
          <Header
            title='Thông tin môn học'
          />
        )
    });

    render() {
        return (
            <Box f={1} width='100%' p='xs' center >
                <Box center f={2}>
                    <Avatar 
                        source={require('../../../../assets/images/icons/MaleStudent.png')}
                        showEditButton
                        size="large"
                        rounded
                        activeOpacity={0.7}
                        title="TL"
                        onPress={() => console.log("Works!")}
                    />
                    <Text mt='sm'>Giảng viên: {obj.lecturer}</Text>
                </Box>
                <Box mt='lg' f={5} >
                    <Box f={1} w={theme.width*0.9}>
                        <Box >
                            <Text mt='xs' numberOfLines={1} style={{width: '100%'}}>
                                <Text weight='bold'>Môn học: </Text> 
                                <Text >{obj.courseName}</Text>  
                            </Text>
                        </Box>
                        <Box dir='row' mt='xs'>
                            <Text weight='bold' mr='xs'>Tiết bắt đầu:</Text>
                            <Text>{obj.startingSesions} -> { parseInt(obj.noOfSecsions) + parseInt(obj.startingSesions)}</Text>
                        </Box>
                        <Box dir='row' mt='xs'>
                            <Text weight='bold' mr='2xs'>Phòng:</Text>
                            <Text>{obj.room}</Text>
                        </Box>
                        <Box dir='row' mt='xs'>
                            <Text weight='bold' mr='2xs'>Lớp:</Text>
                            <Text>{obj.class}</Text>
                        </Box>
                    </Box>

                </Box>
            </Box>
        );
    }
}
