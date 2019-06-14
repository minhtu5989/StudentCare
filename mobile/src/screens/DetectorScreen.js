import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert
} from 'react-native';
 
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob';
import Permissions from 'react-native-permissions'
import { Button } from "react-native-elements";
import _ from 'lodash';

import { api } from "../api/ApiConfig";

export class DetectorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photo_style: {
            position: 'absolute',
            width: '80%%',
            height: '80%'
        },
        photo: null,
        face_data: null
    };
    imagePickerOptions = {
      title: 'Chọn ảnh', 
      takePhotoButtonTitle: 'Chụp ảnh', 
      chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
      cameraType: 'front', 
      mediaType: 'photo',
      maxWidth: 480,
      quality: 1, 
      noData: false, 
      path: 'images'
    };
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
 
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <ImageBackground
              style={this.state.photo_style}
              source={this.state.photo}
              resizeMode={"contain"}
          >
              { this._renderFaceBoxes .call(this) }
          </ImageBackground>
        </View>
        <View style={{flexDirection: 'row', marginTop: 100}}>
          <Button
            title='Chọn ảnh'
            onPress={this._pickImage}
            buttonStyle={styles.button}
          />

          { this._renderDetectFacesButton() }
        </View>
 
      </View>
    );
  }
 
  
 
  _pickImage = () => {
     
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
          photo_data: response.data
        });
      }
    });
 
  }
 
  _renderDetectFacesButton = () => {
    if(this.state.photo_data){
        return  (
            <Button
              title='Nhận diện'
              onPress={this._detectFaces}
              buttonStyle={styles.button}
            />
        );
    }
  }

  //Identify faces
  _presence = async() => {
    let ids = this.state.face_data.map( el => el.faceId )
    const resCandidates = await api.Identify
    .headers({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": api.keyApi
    })
    .post(
      {
        "largePersonGroupId": "tuluong1",
        "faceIds": ids,
        "maxNumOfCandidatesReturned": 50,
        "confidenceThreshold": 0.7
      }
    )
    .json()

    if(!resCandidates.length){
      alert("Không tìm thấy khuôn mặt. Vui lòng thử lại");
    }
   
    let facesDetect = this.state.face_data    
    
    for ( let i = 0; i < facesDetect.length; i++ ) {
      for ( let j = 0; j < resCandidates.length; j++ ) {
        if ( facesDetect[i].faceId == resCandidates[j].faceId ){
          let candidates = resCandidates[j].candidates;
          facesDetect[i].candidates = candidates
        }
      }
    }
    
    let exist = []
    let noExist = []

    for ( let i = 0; i < facesDetect.length; i++ ) {
      if(facesDetect[i].candidates[0].confidence > 0.8){
        exist.push(facesDetect[i])
      }
      else
        noExist.push(facesDetect[i])
    }

    console.log(`ex: ${JSON.stringify(exist)}, noEx: ${JSON.stringify(noExist)}`);
    
    // List faces in group 
    const resList = await api.List 
    .headers({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": api.keyApi
    })
    .get()
    .json()

    if(!resList.length){
      return console.log('No list response !') 
    }

    for ( let i = 0; i < exist.length; i++ ) {
      for ( let j = 0; j < resList.length; j++ ) {
        if ( exist[i].candidates[0].personId == resList[j].personId ){
          let name = resList[j].name;
          exist[i].name = name
          console.log('name', resList[j].name);
          
        }
      }
    }
    console.log('exist 2', exist);
    return 
  }
 
  //Detect faces
  _detectFaces = async() => {
    await RNFetchBlob.fetch('POST', api.Detect, {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": api.keyApi
    }, this.state.photo_data)
    .then((res) => {
        return res.json();      
    })
    .then((json) => {
        if(json.length){
            this.setState({
                face_data: json
            });
        }else{
            alert("Không tìm thấy khuôn mặt. Vui lòng thử lại");
        }
        this._presence()
        return json;
    })
    .catch (function (error) {
        console.log(error);
        alert('Xin lỗi ! Phát hiện lỗi đường truyền !');
    });
  }
 
  _renderFaceBoxes = () => {
  
    if(this.state.face_data){
    
      let views = _.map(this.state.face_data, (x) => {
          
          let box = {
              position: 'absolute',
              top: x.faceRectangle.top,
              left: x.faceRectangle.left
          };

          let style = { 
              width: x.faceRectangle.width,
              height: x.faceRectangle.height,
              borderWidth: 1.5,
              borderColor: 'yellow',
          };
          
          let attr = {
              color: 'yellow',
          };

          return (
            <View key={x.faceId} style={box}>
                {console.log('faceAttributes',x)}
                <View style={style}></View>
                {/* <Text style={attr}>Giới tính: {(x.faceAttributes.gender==='male')?'Nam':'Nữ'}</Text> */}
                {/* <Text style={attr}>Tuổi: {x.faceAttributes.age}</Text> */}
            </View>
          );
      });

      return <View>{views}</View>
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
    padding: 15,
    backgroundColor: '#529ecc'
  },
  button_text: {
    color: '#FFF',
    fontSize: 20
  }
});
 

 