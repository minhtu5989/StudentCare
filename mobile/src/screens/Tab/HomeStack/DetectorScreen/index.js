import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
  FlatList,
} from 'react-native';
 
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'react-native-fetch-blob';
import Permissions from 'react-native-permissions'
import { Button } from "react-native-elements";
import _ from 'lodash';
import Modal from 'react-native-modalbox';
import { Header } from "../../../../commons";
import { observer, inject, } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { ListItem } from 'react-native-elements'

import { NavigationService } from '../../../../constants/NavigationService';
import {theme} from '../../../../constants/theme'
import { Box } from 'react-native-design-utility'
import { api } from "../../../../api/ApiConfig";

@inject('authStore')
@observer
export default class DetectorScreen extends Component {
  constructor(props) {
    super(props);
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
    classObj = this.props.navigation.getParam('obj')
  }

  @observable photo_style = { 
    position: 'absolute',
    photo: null,
  }
  @observable isOpen = false
  @observable face_data = null
  @observable cameraPermission = false
  @observable photoPermission = false
  @observable listFaces = null
  @observable faceDetected = null
  @observable photo_data = null


  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        title='Điểm danh'
      />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, height: theme.height*0.75}}>
          <ImageBackground
              style={toJS(this.photo_style)}
              source={toJS(this.photo_style.photo)}
              resizeMode={"contain"}
          >
              { this._renderFaceBoxes() }
          </ImageBackground>
        </View>
        <View style={{flexDirection: 'row', marginTop: 100}}>
          <Button
            title='Chụp ảnh'
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
          isOpen={this.isOpen} 
          onClosed={() => this.isOpen = false} 
          style={styles.modal} 
          position={"bottom"} 
          // backdropContent={<Text>dsa</Text>}
          animationDuration={500}
          swipeArea={100}
        > 
            <Box f={1} style={{marginTop:10, width: `100%`}}  >
                <Box align='center' h={30} bg={theme.color.blueLighter} >
                  <Text style={{textDecorationLine:'underline'}}>Danh sách sinh viên đi học :</Text>
                </Box>
                <Box f={1} center bg={theme.color.white}>
                  {this._renderNoPresence()}
                </Box>
                
            </Box>
        </Modal>

      </View>
    );
  }

  _renderBtnList = () => {
  if(this.faceDetected){
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
    if(this.photo_data){
        return  (
            <Button
              title='Nhận diện'
              onPress={this._detectFaces}
              buttonStyle={styles.button}
            />
        );
    }
  }

  //===============================================================Detect
  _detectFaces = async() => {

    await RNFetchBlob.fetch('POST', api.Detect, {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": api.keyApi
    }, this.photo_data)
    .then((res) => {
        return res.json();      
    })
    .then((json) => {
        if(json.length){
          this.face_data = json
        }else{
          console.log(`No face detected`);
          return alert("Không tìm thấy khuôn mặt. Vui lòng thử lại");
        }
        return this._presence()
    })
    .catch (function (error) {
        console.log(error);
        alert('Lỗi kết nối internet');
    });
  }

    //===============================================================Identify & List
  _presence = async() => {
    let ids = this.face_data.map( el => el.faceId )
    const resCandidates = await api.Identify
    .headers({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": api.keyApi
    })
    .post({
        "largePersonGroupId": api.groupName,
        "faceIds": ids,
        "maxNumOfCandidatesReturned": 60,
        "confidenceThreshold": 0.7
    })
    .json()

    if(!resCandidates.length){
      alert("Không tìm thấy khuôn mặt. Vui lòng thử lại");
    }

    console.log('resCandidates', resCandidates);
    
    let faceDetected = this.face_data    
    
    for ( let i = 0; i < faceDetected.length; i++ ) {
      for ( let j = 0; j < resCandidates.length; j++ ) {
        if ( faceDetected[i].faceId == resCandidates[j].faceId ){
          faceDetected[i].candidates = resCandidates[j].candidates;
        }
      }
    }

    //=============================================================== List faces in group 
    try {
      const resList = await api.List 
      .headers({
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": api.keyApi
      })
      .get()
      .json()

      if(!resList.length){
        console.log('No list response !') 
        throw new Error
      }
      this.listFaces = resList

    } catch (error) {
      alert('Lỗi kết nối internet')
      return console.log('Error - 132: ', error)
    }

    for ( let i = 0; i < faceDetected.length; i++ ) {
      for ( let j = 0; j < resList.length; j++ ) {
        if(faceDetected[i].candidates[0] !== undefined)
        {
          if ( faceDetected[i].candidates[0].personId == resList[j].personId ){
            faceDetected[i].name = resList[j].name;
          }
        }
      }
    }

    console.log('====================================');
    console.log('data name', faceDetected);
    console.log('====================================');
    
    return this.faceDetected = faceDetected
  }
 
  _renderNoPresence = () => {
    if(!this.faceDetected){
      return console.log('have not Face');
    }
    else{
      console.log(`faces ${this.faceDetected}`);
      console.log(`noOfStu ${classObj.students}`);

      const exist = []
      classObj.students.forEach(el1 => {
        this.faceDetected.forEach(el2 => {
          if(el1.userName == el2.name){
            el1.candidates = el2.candidates
            el1.exist = 1
            exist.push(el1)
          }
        });
      });

      console.log('====================================');
      console.log('exist', exist[0]);
      console.log('====================================');
      
      if(exist.length == classObj.students.length){
        return (
          <Box center f={1}>
            <Text>Đi học đầy đủ</Text>
          </Box>
        )
      }
      else{
        return (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={classObj.students}
            renderItem={ ({item}) => 
              <ListItem
                title={`${item.holotvn} ${item.tenvn}`}
                subtitle={item.userName}
                leftAvatar={require('../../../../assets/images/icons/MaleStudent.png')}
                containerStyle={{
                  backgroundColor: (item.exist == 1) ? theme.color.success : theme.color.danger,
                }} 
              />
            }
          />
        )
      }
    }
  }

  _renderFaceBoxes = () => {
  
    if(this.faceDetected){
    
      let views = this.faceDetected.map((f) => {
          
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
                        source={require('../../../../assets/images/icons/MaleStudent.png')}
                      />
                      :
                      <Image
                        style={{height:20, resizeMode:'contain'}}
                        source={require('../../../../assets/images/icons/FemaleStudent.png')}
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
                        source={require('../../../../assets/images/icons/XCircle.png')}
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

  _checkCameraAndPhotos = () => {
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      this.cameraPermission = response.camera
      this.photoPermission = response.photo
    })
  }

  _alertForPhotosPermission() {
    Alert.alert(
      'Cho phép truy cập thư viện ảnh',
      '',
      [
        {
          text: 'Từ chối',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        this.photoPermission == 'undetermined'
          ? { text: 'Chấp nhận', onPress: this._checkCameraAndPhotos }
          : { text: 'Cài đặt', onPress: Permissions.openSettings },
      ],
    )
  }

  _pickImage = () => {
    this.face_data = null
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if(response.error){
        this._alertForPhotosPermission()
      }else{
        let source = {uri: response.uri};

        this.photo_data = response.data,
        this.faceDetected = null
        this.photo_style = {
          position: 'relative',
          width : response.width,
          height : response.height,
          photo: source
        }
      }
    });
  }
  
  componentDidMount() {
    this._checkCameraAndPhotos()
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
    padding: 10,
    backgroundColor: '#529ecc'
  },
  button_text: {
    color: '#FFF',
    fontSize: 20
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
 

 