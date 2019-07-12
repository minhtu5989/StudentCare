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
        nameClass = obj.lectureCode + obj.codeCourse
        nameClass = nameClass.toLowerCase()
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
          <Header
            title='Thông tin môn học'
          />
        )
    });


  //===============================================================PUT class
  _putClass = async() => {
    console.log('nameClass real', nameClass);

    await api.PutClass 
    .headers({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": api.keyApi
    })
    .url(`/${nameClass}`)
    .put({
      "name": obj.lecturer,
      "userData": obj.lectureCode,
      "recognitionModel": "recognition_02"
    })
    .res(res => {
      console.log('response:', res);
    })
    console.log('nameClass real 2 ', nameClass);

  }

  //===============================================================Turn on Training
  _training = async() => {
    const resTrain = await api.Training 
    .url(`/${nameClass}/train`)
    .headers({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": api.keyApi
    })
    .post()
    .json()
    console.log('train', resTrain);

    const StatusTraining = await api.StatusTraining 
    .url(`/${nameClass}/training`)
    .headers({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": api.keyApi
    })
    .get()
    .json()

    console.log('train status', StatusTraining);
    
  }

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
                        <Box mt='lg' center>
                            <Button
                                title="Điểm danh"
                                onPress={ () => {
                                    NavigationService.navigate('Detector', {obj})
                                    this._putClass()
                                    this._training()
                                } }
                                buttonStyle={{margin: 20, width: theme.width*0.7, backgroundColor: '#25c73a'}}
                            />
                        </Box>
                    </Box>

                </Box>
            </Box>
        );
    }
}
