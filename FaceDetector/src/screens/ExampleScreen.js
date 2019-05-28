import React, { Component } from 'react'
import { 
    StyleSheet, 
    Picker
} from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '@constants/theme';
// import { NavigationService } from '@api/NavigationService';
import { EvilIcons } from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import {Calendar} from 'react-native-calendars';

import { Detector } from "../components/Detector";
import { MyButton } from '@commons/MyButton';

const imagePickerOptions = {
    title: 'Chọn ảnh', 
    takePhotoButtonTitle: 'Chụp ảnh', 
    chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
    cameraType: 'back', 
    mediaType: 'photo',
    maxWidth: 480,
    quality: 1, 
    noData: false, 
    path: 'images'
};

export class ExampleScreen extends Component {
    constructor() {
        super();
        this.state = {
          isOpen: false,
          isDisabled: false,
          swipeToClose: true,
        };
      }
    
    onClose() {
    console.log('Modal just closed');
    }

    onOpen() {
    console.log('Modal just opened');
    }

    render() {
        return (
            <Box f={1} w={'100%'} h={'100%'} bg={theme.blueLight} center>
                
                
                <MyButton onPress={() => this.refs.modal1.open()} style={[styles.btn]} type='success'>
                        <Text> Modal </Text>
                </MyButton>
                
                <Box bg='lightblue'>
                    <Detector imagePickerOptions={imagePickerOptions} />
                </Box>




                <Modal 
                    ref={"modal1"}
                    backdropOpacity={0.4}
                    backdropColor="black"
                    isOpen={this.state.isOpen} 
                    onClosed={() => this.setState({isOpen: false})} 
                    style={styles.modal} 
                    position={"bottom"} 
                    // backdropContent={<Text>dsa</Text>}
                    animationDuration={500}
                    backButtonClose
                >
                    <Box center  bg='lightblue' dir='row' style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 200}}  >
                        <Text style={{textDecorationLine:'underline'}}>Môn học:</Text>
                        <Picker
                            selectedValue={this.state.obj}
                            style={{ height: 50, width: 100}}
                            mode="dropdown" //dropdown dialog
                            onValueChange={(itemValue, itemIndex) => this.setState({obj: itemValue})}>
                            <Picker.Item label="Nhập môn CNTT" value="nhapmon" />
                            <Picker.Item label="Big Data" value="bigdata" />
                            <Picker.Item label="Machine learning" value="machine" />
                        </Picker>
                    </Box>
                </Modal>
            </Box>
        );
    }
    
}

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 400
    },
      btn: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

})


