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
                    <Box>
                        <Text weight='bold'>Môn học: </Text> 
                        <Text numberOfLines={1} style={{width: '100%'}}>{obj.courseName}</Text>  
                    </Box>
                    <Box dir='row'>
                        <Text weight='bold' mr='2xs'>Tiết bắt đầu:</Text>
                        <Text>{obj.startingSesions} -> { parseInt(item.obj.noOfSecsions) + parseInt(item.obj.startingSesions)}</Text>
                    </Box>
                    <Box dir='row'>
                        <Text weight='bold' mr='2xs'>Phòng:</Text>
                        <Text>{obj.room}</Text>
                    </Box>
                    <Box dir='row'>
                        <Text weight='bold' mr='2xs'>Lớp:</Text>
                        <Text>{obj.class}</Text>
                    </Box>
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
