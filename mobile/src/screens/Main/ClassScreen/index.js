import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { Button, Avatar } from "react-native-elements";

import { theme } from '../../../constants/theme';
import { NavigationService } from '../../../constants/NavigationService';

export class ClassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        obj = this.props.navigation.getParam('obj')
    }

    // static navigationOptions = ({ navigation }) => ({
    //     title: 'NewFile',
    // });

    render() {
        return (
            <Box f={1} m='lg' >
                <Box center justify='around'>
                    <Avatar 
                        size="large"
                        rounded
                        activeOpacity={0.7}
                        title="MK"
                        onPress={() => console.log("Works!")}
                    />
                    <Text>Tên giáo viên: Mỹ Kim</Text>
                </Box>
                <Box mt='lg'>
                    <Text>Môn học:   {obj.courseName}</Text>
                    <Text>Tiết bắt đầu:   {obj.startingSession}</Text>
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
