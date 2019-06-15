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
import { NavigationService } from '../constants/NavigationService';
import Modal from 'react-native-modalbox';
import {theme} from '../constants/theme'
import { Box } from 'react-native-design-utility'

import { api } from "../api/ApiConfig";

export class DetectorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      facesDetect: null,
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
                  {this._renderNoExist()}
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
          facesDetect: null
        });
      }
    });
 
  }

  _renderBtnList = () => {
  if(this.state.renderList === 1){
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
   
    let facesDetect = this.state.face_data    
    
    for ( let i = 0; i < facesDetect.length; i++ ) {
      for ( let j = 0; j < resCandidates.length; j++ ) {
        if ( facesDetect[i].faceId == resCandidates[j].faceId ){
          let candidates = resCandidates[j].candidates;
          facesDetect[i].candidates = candidates
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

    for ( let i = 0; i < facesDetect.length; i++ ) {
      for ( let j = 0; j < resList.length; j++ ) {
        console.log('1',facesDetect[i].candidates[0]);
        if(facesDetect[i].candidates[0] !== undefined)
        {
          if ( facesDetect[i].candidates[0].personId == resList[j].personId ){
            let name = resList[j].name;
            facesDetect[i].name = name
          }
        }
      }
    }

    console.log('====================================');
    console.log('data name', facesDetect);
    console.log('====================================');
    
    return this.setState({ facesDetect, renderList: 1 })
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
        return this.setState({});
    })
    .catch (function (error) {
        console.log(error);
        alert('Xin lỗi ! Phát hiện lỗi đường truyền !');
    });
  }
 
  _renderFaceBoxes = () => {
  
    if(this.state.facesDetect){
    
      let views = this.state.facesDetect.map((f) => {
          
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
                {/* <Text style={attr}>Giới tính: {(x.faceAttributes.gender==='male')?'Nam':'Nữ'}</Text> */}
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

  _renderNoExist = () => {
    {
      // const noExist = []
      // for ( let i = 0; i < faces.length; i++ ) {
      //   for ( let j = 0; j < list.length; j++ ) {
      //     console.log('1',list[i].name);
      //     if(list[i].candidates[0] !== undefined)
      //     {
      //       if ( faces[i].candidates[0].personId !== list[j].personId ){
      //         noExist.push(resList[j].name)
      //       }
      //     }
      //   }
      // }

      // return console.log('no', noExist);
      

      // if(this.state.noExist !== []){
      //   return <Text>Đi học đầy đủ</Text>
      // }
      return <FlatList
        data={this.state.facesDetect}
        // extraData={this.state}
        keyExtractor={(item) => item.faceId}
        renderItem={item => 
          <Box m='sm'>
            <Text>{(item.name)}</Text>
          </Box>
        }
      />
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
 

 