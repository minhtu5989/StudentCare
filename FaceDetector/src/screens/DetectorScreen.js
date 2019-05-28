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
import { Button } from "../components/Button";
import RNFetchBlob from 'react-native-fetch-blob';
import Permissions from 'react-native-permissions'
import _ from 'lodash';



export class DetectorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photo_style: {
            position: 'absolute',
            width: '80%%',
            height: '80%'
        },
        has_photo: false,
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
          text: 'No way',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        this.state.photoPermission == 'undetermined'
          ? { text: 'OK', onPress: this._checkCameraAndPhotos }
          : { text: 'Open Settings', onPress: Permissions.openSettings },
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
              text="Chọn"
              onpress={this._pickImage}
              button_styles={styles.button}
              button_text_styles={styles.button_text} 
          />
          { this._renderDetectFacesButton.call(this) }
        </View>
 
      </View>
    );
  }
 
 
  _pickImage = () => {
     
    this.setState({
        face_data: null
    });
 
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
         
      if(response.error){
        // alert('Không tìm thấy ảnh. Vui lòng thử lại');
        this._alertForPhotosPermission()
      }else{
         
        let source = {uri: response.uri};
 
        this.setState({
          photo_style: {
            position: 'relative',
            width: response.width,
            height: response.height
          },
          has_photo: true,
          photo: source,
          photo_data: response.data
        });
        // alert(JSON.stringify(response.data))
      }
    });
 
  }
 
  _renderDetectFacesButton = () => {
    if(this.state.has_photo){
        return  (
            <Button
                text="Nhận diện"
                onpress={this._detectFaces.bind(this)}
                button_styles={styles.button}
                button_text_styles={styles.button_text} />
        );
    }
  }
 
  _detectFaces = () => {
    RNFetchBlob.fetch('POST', 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender', {
      "Accept": "application/json",
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": "4f12445ce8f84307897b1673854ed6b1"
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
            alert("Sorry, I can't see any faces in there.");
        }
         
        return json;
    })
    .catch (function (error) {
        console.log(error);
        alert('Sorry, the request failed. Please try again.' + JSON.stringify(error));
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
                borderWidth: 2,
                borderColor: 'yellow',
            };
             
            let attr = {
                color: 'yellow',
            };
 
            return (
                <View key={x.faceId} style={box}>
                    <View style={style}></View>
                    <Text style={attr}>Giới tính: {(x.faceAttributes.gender==='male')?'Nam':'Nữ'}</Text>
                    <Text style={attr}>Tuổi: {x.faceAttributes.age}</Text>
                    <Text style={attr}>Tên: chưa xác định</Text>
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
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ccc'
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
 