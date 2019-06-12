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
          <Button
            title='điểm danh'
            onPress={this.diendanh}
            buttonStyle={styles.button}
          />
          { this._renderDetectFacesButton.call(this) }
        </View>
 
      </View>
    );
  }
 
  diendanh = () => {
    xxx = this.state.ids.map( el => el.faceId )
    alert(xxx)
    RNFetchBlob.fetch('POST', api.Identify, {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": api.keyApi
    }, 
      {
        "largePersonGroupId": "hutechcare",
        "faceIds": xxx,
        "maxNumOfCandidatesReturned": 10,
        "confidenceThreshold": 0.5
      }
    )
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
        
        return json;
    })
    .catch (function (error) {
        console.log(error);
        alert('Xin lỗi ! Phát hiện lỗi đường truyền !');
    });

  }
 
  _pickImage = () => {
     
    this.setState({
        face_data: null
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
              title='Nhận diện'
              onPress={this._detectFaces.bind(this)}
              buttonStyle={styles.button}
            />
        );
    }
  }
 
  _detectFaces = () => {
    console.log(`api: ${api.Detect}, key : ${api.keyApi}`);
    
    RNFetchBlob.fetch('POST', api.Detect, {
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
         
        return this.setState({ids: json});
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
                borderWidth: 2,
                borderColor: 'yellow',
            };
             
            let attr = {
                color: 'yellow',
            };
 
            return (
              <View key={x.faceId} style={box}>
                    <Text style={attr}>{x.candidates > 0.5 ? 'Có mặt' : 'Không xác định'}</Text>
                    <View style={style}></View>
                    <Text style={attr}>Giới tính: {(x.faceAttributes.gender==='male')?'Nam':'Nữ'}</Text>
                    <Text style={attr}>Tuổi: {x.faceAttributes.age}</Text>
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
 

