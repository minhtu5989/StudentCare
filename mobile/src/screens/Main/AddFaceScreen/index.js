import React, {Component} from 'react';

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
 
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob';
import Permissions from 'react-native-permissions'
import { Button } from "react-native-elements";
import _ from 'lodash';
import { NavigationService } from '../../../constants/NavigationService';
import Modal from 'react-native-modalbox';
import {theme} from '../../../constants/theme'
import { Box } from 'react-native-design-utility'

import { api } from "../../../api/ApiConfig";

export default class AddFaceScreen extends Component {
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
      tenSV: ''
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
    nameClass = this.props.navigation.getParam('nameClass')
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={{flex:1, height: theme.height*0.8}}>
              <ImageBackground
                  style={this.state.photo_style}
                  source={this.state.photo}
                  resizeMode={"contain"}
              >
                  { this._renderFaceBoxes() }
              </ImageBackground>
            </View>
            <Box mt={80}>
              <Text style={{textDecorationLine:'underline'}}>Tên sinh viên:</Text>
            </Box>
            <Box center dir='row' mt='xs'>
              <TextInput 
                style={styles.textInput}            
                placeholder={'Họ tên SV'} 
                keyboardType='default'                   
                value={this.state.tenSV}
                onChangeText={(text) => this.setState({tenSV:text})}
                returnKeyType='done'
                // placeholderTextColor = {theme.color.black}
              />
              <Button
                title='Thêm'
                onPress={this._createId}
                // titleStyle={{fontSize:15}}
                buttonStyle={[styles.button, {width: 70, height:40, backgroundColor: theme.color.success,}]}
              />
            </Box>
            <View style={{flexDirection: 'row'}}>
              <Button
                title='Chụp ảnh'
                onPress={this._takePic}
                buttonStyle={styles.button}
              />
              { this._renderAddFacesButton() }
            </View>
            {/* <View style={{ marginTop: 10}}>
              {this._renderBtnList()}
            </View> */}

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
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

  _renderBtnList = () => {
  if(this.state.faceDetected){
    return  (
        <Button
          title='Xem danh sách'
          onPress={() => this.refs.modal1.open()}
          buttonStyle={styles.button}
        />
    );
  }
  }
 
  _renderAddFacesButton = () => {
    if(this.state.photo_data){
        return  (
            <Button
              title='Add Face'
              onPress={this._addFace}
              buttonStyle={styles.button}
            />
        );
    }
  }

  //===============================================================Identify faces
  _addFace = async() => {
    
    await RNFetchBlob.fetch('POST', `${api.AddFace}/${nameClass}/persons/${this.state.svID}/persistedFaces?detectionModel=detection_02`, {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": api.keyApi
    }, this.state.photo_data)
    .then((res) => {
        return res.json();      
    })
    .then((json) => {
        if(json.persistedFaceId){
          console.log(`persistedFaceId`, json.persistedFaceId);
          return alert("Thêm thành công !");
        }
        if(json.error.message === 'There is more than 1 face in the image.'){
            return alert(`Có nhiều hơn 1 khuôm mặt trong khung ảnh !`)
        }
        if(json.error.message === 'No face detected in the image.'){
          return alert(`Không nhận ra khuôn mặt nào !`)
        }

        console.log('json', json);
        throw new Error
    })
    .catch (function (error) {
        console.log(error);
        return alert('Phát hiện lỗi không kết nối internet.');
    });
  }

 
  //===============================================================Detect faces
  _createId = async() => {
    if(!this.state.tenSV || this.state.tenSV === '') return alert("Vui lòng nhập tên SV")
    try {
      const resId = await api.CreatePersonId 
      .headers({
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": api.keyApi
      })
      .url(`/${nameClass}/persons`)
      .post({
          "name": this.state.tenSV,
          "userData": classObj.lectureCode,
          "recognitionModel": "recognition_02"
      })
      .json()

      if(resId.personId){
        console.log(`resId`, resId.personId);
        alert("Thêm thành công !")
        svID = resId.personId
        return this.setState({ svID })
      }

      if(!resId){
        throw new Error
      }

      throw new Error

    } catch (error) {
      console.log('error: ',error);
      alert('Phát hiện lỗi không kết nối internet.')
    }
    
  }
 
  _renderFaceBoxes = () => {
  
    if(this.state.faceDetected){
    
      let views = this.state.faceDetected.map((f) => {
          
          let box = {
              position: 'absolute',
              top: f.faceRectangle.top,
              left: f.faceRectangle.left
          };

          let style = { 
              width: f.faceRectangle.width ,
              height: f.faceRectangle.height ,
              borderWidth: 1.5,
              borderColor: theme.color.warning,
              marginBottom: 5
          };
          
          let attr = {
              color: theme.color.warning,
          };

          return (
            <View key={f.faceId} style={box}>
                <View style={style}></View>
                <View style={{alignItems:'center',flex:1}}>
                  {/* <Text style={attr}>
                    {
                      (f.faceAttributes.gender==='male')
                      ?
                      <Image
                        style={{height:20, resizeMode:'contain'}}
                        source={require('../../../assets/images/icon/MaleStudent.png')}
                      />
                      :
                      <Image
                        style={{height:20, resizeMode:'contain'}}
                        source={require('../../../assets/images/icon/FemaleStudent.png')}
                      />
                    }
                  </Text> */}
                  <Text style={attr}>
                    {
                      (f.name)
                      ?
                      `${f.name}`
                      :
                      <Image
                        style={{height:20, resizeMode:'contain'}}
                        source={require('../../../assets/images/icon/XCircle.png')}
                      />
                    }
                  </Text>
                </View>
            </View>
          );
      });

      return <View>{views}</View>
    }
 
  }
   
  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  _renderNoPresence = () => {
    if(!this.state.faceDetected){
      return console.log('have not Face');
    }
    else{
      let noPresence = []
      let faces = this.state.faceDetected
      let list = this.state.listFaces
      console.log(`faces ${faces}, list ${list}`);
      

      for ( let i = 0; i < faces.length; i++ ) {
        for ( let j = 0; j < list.length; j++ ) {
          if(faces[i].candidates[0] !== undefined)
          {
            if ( faces[i].candidates[0].personId !== list[j].personId ){
              noPresence.push(list[j])
            }
          }
        }
      }

      if(noPresence.length == 0){
        return (
          <Box center f={1}>
            <Text>Đi học đầy đủ</Text>
          </Box>
        )
      }
      else{
        console.log('noPresence', noPresence);
        return (
          <FlatList
            data={noPresence}
            // extraData={this.state}
            keyExtractor={(item) => item.name}
            renderItem={ ({item}) => 
              <Box mt='sm' center f={1} w={theme.width*0.9} h={40} bg={theme.color.greyLight}>
                <Text> {(item.name)} </Text>
              </Box>
            }
          />
        )
      }
    }
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
 

 