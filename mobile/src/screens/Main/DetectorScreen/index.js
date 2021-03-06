import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
  Picker,
  FlatList
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

export class DetectorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      faceDetected: null,
      photo_style: {
          position: 'absolute'
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
      maxWidth: theme.width,
      quality: 1, 
      noData: false, 
      path: 'images'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, height: theme.height*0.8}}>
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
        <View style={{ marginTop: 10}}>
          {this._renderBtnList()}
        </View>
 
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
            <Box f={1} style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, height: `100%`, width: `100%`}}  >
                <Box center h={40} bg={theme.color.blueLighter} style={{borderTopLeftRadius: 20, borderTopRightRadius: 20 }} >
                  <Text style={{textDecorationLine:'underline'}}>Danh sách sinh viên đi học :</Text>
                </Box>
                <Box f={1} center>
                  {this._renderNoPresence()}
                </Box>
                
            </Box>
        </Modal>

      </View>
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
   
    let faceDetected = this.state.face_data    
    
    for ( let i = 0; i < faceDetected.length; i++ ) {
      for ( let j = 0; j < resCandidates.length; j++ ) {
        if ( faceDetected[i].faceId == resCandidates[j].faceId ){
          let candidates = resCandidates[j].candidates;
          faceDetected[i].candidates = candidates
        }
      }
    }

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

    this.setState({ listFaces: resList })

    for ( let i = 0; i < faceDetected.length; i++ ) {
      for ( let j = 0; j < resList.length; j++ ) {
        if(faceDetected[i].candidates[0] !== undefined)
        {
          if ( faceDetected[i].candidates[0].personId == resList[j].personId ){
            let name = resList[j].name;
            faceDetected[i].name = name
          }
        }
      }
    }

    console.log('====================================');
    console.log('data name', faceDetected);
    console.log('====================================');
    
    return this.setState({ faceDetected })
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
          console.log(`No face detected`);
          return alert("Không tìm thấy khuôn mặt. Vui lòng thử lại");
        }
        this._presence()
        return this.setState({});
    })
    .catch (function (error) {
        console.log(error);
        alert('Phát hiện lỗi không kết nối internet.');
    });
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
              width: f.faceRectangle.width,
              height: f.faceRectangle.height,
              borderWidth: 1.5,
              borderColor: 'yellow',
          };
          
          let attr = {
              color: 'yellow',
          };

          return (
            <View key={f.faceId} style={box}>
                <View style={style}></View>
                <View style={{alignItems:'center'}}>
                  <Text style={attr}>{(f.name)?` Tên: ${f.name}`:'X'}</Text>
                </View>
                {/* <Text style={attr}>Giới tính: {(f.faceAttributes.gender==='male')?'Nam':'Nữ'}</Text> */}
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

      if(noPresence == []){
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
            extraData={this.state.faceDetected}
            keyExtractor={(item) => item.name}
            renderItem={item => 
              <Box m='sm' center f={1}>
                <Text>{(item.name)}</Text>
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
    padding: 15,
    backgroundColor: '#529ecc'
  },
  button_text: {
    color: '#FFF',
    fontSize: 20
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: theme.height*0.8
  },

});
 

 