import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
  Picker,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
 
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from "react-native-image-picker";
import Permissions from 'react-native-permissions'
import { Button } from "react-native-elements";
import _ from 'lodash';
import { observer, inject, } from 'mobx-react';
import { observable } from 'mobx';
import { Box } from 'react-native-design-utility'

import { NavigationService } from '../../../../constants/NavigationService';
import Modal from 'react-native-modalbox';
import {theme} from '../../../../constants/theme'
import { Header } from "@src/commons";
import { api } from "../../../../api/ApiConfig";

@inject('stuStore')
@observer
export default class AddFaceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      faceDetected: null,
      photo_style: {
          position: 'absolute'
      },
      photo: null,
      face_data: null,
    };
    imagePickerOptions = {
      title: 'Chọn ảnh', 
      takePhotoButtonTitle: 'Chụp ảnh', 
      chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
      cameraType: 'front', 
      mediaType: 'photo',
      maxWidth: theme.width,
      quality: 1, 
      noData: false, 
      path: 'images'
    };
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={{flex:1, height: theme.height*0.7}}>
              <ImageBackground
                  style={this.state.photo_style}
                  source={this.state.photo}
                  resizeMode={"contain"}
              >
              </ImageBackground>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                title='Chụp ảnh'
                onPress={this._takePic}
                buttonStyle={styles.button}
              />
              { this._renderAddFacesButton() }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount = async() => {
    this._checkCameraAndPhotos()
  }

  _requestPermission = () => {
    Permissions.request('photo').then(response => {
      this.setState({ photoPermission: response })
    })
  }

  _checkCameraAndPhotos = () => {
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      this.setState({
        cameraPermission: response.camera,
        photoPermission: response.photo,
      })
    })
  }

  _alertForPhotosPermission() {
    Alert.alert(
      'Can we access your photos ?',
      '',
      [
        {
          text: 'Không',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        this.state.photoPermission == 'undetermined'    
          ? { text: 'Chấp nhận', onPress: this._checkCameraAndPhotos }
          : { text: 'Cài đặt', onPress: Permissions.openSettings },
      ],
    )
  }
  
  _takePic = () => {
    this.setState({
      face_data: null,
    });

    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
         
      if(response.error){
        this._alertForPhotosPermission()
      }else{
         
        let source = {uri: response.uri};

        this.setState({
          photo_style: {
            position: 'relative',
            width: response.width,
            height: response.height
          },
          photo: source,
          photo_data: response.data,
          faceDetected: null
        });
      }
    });
  }
 
  _renderAddFacesButton = () => {
    if(this.state.photo_data){
        return  (
            <Button
              title='Training'
              onPress={this._addFace}
              buttonStyle={styles.button}
            />
        );
    }
  }

  _addFace = async() => {
    await this.props.stuStore.addFace(this.state.photo_data)
    await this.props.stuStore.training()
    this.setState({photo_data:null, photo: null})
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#e6f2ff'
  },
  button: {
    margin: 10,
    backgroundColor: '#529ecc'
  },
  button_text: {
    color: '#FFF',
    fontSize: 20
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    height: 40,
    paddingHorizontal: 5,        
    fontSize: 15,
    fontWeight: "bold",
    color: theme.color.black, 
    backgroundColor: theme.color.white,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: theme.height*0.4,
    backgroundColor: theme.color.blueLighter
  },

});
 

 