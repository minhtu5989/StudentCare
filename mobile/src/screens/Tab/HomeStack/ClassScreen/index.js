import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { Button, Avatar } from "react-native-elements";

import { theme } from '../../../../constants/theme';
import { NavigationService } from '../../../../constants/NavigationService';

export default class ClassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        obj = this.props.navigation.getParam('obj')
    }

    render() {
        return (
            <Box f={1} m='lg' >
                <Box center justify='around'>
                    <Avatar 
                        source={require('../../../../assets/images/icons/MaleStudent.png')}
                        showEditButton
                        size="large"
                        rounded
                        activeOpacity={0.7}
                        title=""
                        onPress={() => console.log("Works!")}
                    />
                    <Text>Giảng viên: {obj.lecturer}</Text>
                </Box>
                <Box mt='lg'>
                    <Text>Môn học:   {obj.courseName}</Text>
                    <Text>Tiết bắt đầu:   {obj.startingSesions} -> {obj.noOfSecsions + obj.startingSesions} </Text>
                    <Text>Phòng:   {obj.room}</Text>
                    <Text>Lớp:   {obj.class}</Text>
                </Box>
                <Box>
                    <Button
                        title="Điểm danh"
                        onPress={ () => NavigationService.navigate('Detector', {obj}) }
                        buttonStyle={{margin: 20, backgroundColor: '#25c73a'}}
                    />
                </Box>
            </Box>
        );
    }
}
