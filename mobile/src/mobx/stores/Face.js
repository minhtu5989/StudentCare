import { types, flow } from 'mobx-state-tree';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from "react-native-image-picker";
import Permissions from 'react-native-permissions'

import { NavigationService } from '../../constants/NavigationService'
import { api } from '../../api/ApiConfig'
import { theme } from "../../constants/theme";

export const AuthStore = types
.model(`FaceStore`, {
    // photo_style: {
    //   position: "absolute", 
    //   photo: null,
    // },
    // isOpen: false,
    // face_data: null,
    // listFaces: null,
    // faceDetected: null,
    // photo_data: null,
    // cameraPermission: false,
    // photoPermission: false,
    // imagePickerOptions: {
    //     title: 'Chọn ảnh', 
    //     takePhotoButtonTitle: 'Chụp ảnh', 
    //     chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
    //     cameraType: 'front', 
    //     mediaType: 'photo',
    //     maxWidth: theme.width,
    //     quality: 1, 
    //     noData: false, 
    //     path: 'images'
    // }
})
.views(self => ({

}))
.actions(self => ({

    // checkCameraAndPhotos : flow(function*(){
    //     // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    //     Permissions.checkMultiple(['camera', 'photo']).then(response => {
    //       self.cameraPermission = response.camera
    //       self.photoPermission = response.photo
    //     })
    // }),
    
    // alertForPhotosPermission: flow(function*(){
    //     Alert.alert(
    //         'Cho phép truy cập thư viện ảnh',
    //         '',
    //         [
    //         {
    //             text: 'Từ chối',
    //             onPress: () => console.log('Permission denied'),
    //             style: 'cancel',
    //         },
    //         self.photoPermission == 'undetermined'
    //             ? { text: 'Chấp nhận', onPress:  self.checkCameraAndPhotos() }
    //             : { text: 'Cài đặt', onPress: Permissions.openSettings },
    //         ],
    //     )
    // }),

    // pickImage: flow(function*(){
    //     // this._putClass()
    //     // this._training()
    
    //     self.face_data = null
    
    //     ImagePicker.showImagePicker(self.imagePickerOptions, (response) => {
    //       if(response.error){
    //         self.alertForPhotosPermission()
    //       }else{
    //         self.photo_data = response.data,
    //         self.faceDetected = null
    //         self.photo_style = {
    //           position: 'relative',
    //           width : response.width,
    //           height : response.height,
    //           photo: { uri: response.uri }
    //         }
    //       }
    //     })
    // }),

    // putClass: flow(function*(nameClass){
    //     console.log('nameClass', nameClass);
    
    //     yield api.PutClass 
    //     .headers({
    //       "Content-Type": "application/json",
    //       "Ocp-Apim-Subscription-Key": api.keyApi
    //     })
    //     .url(`/${nameClass}`)
    //     .put({
    //       "name": classObj.lecturer,
    //       "userData": classObj.lectureCode,
    //       "recognitionModel": "recognition_02"
    //     })
    //     .res(res => {
    //       console.log('=============response:', res);
    //     })
    //   }),
  
    //   training: flow(function*(nameClass){
    //     const resTrain = yield api.Training 
    //     .url(`/${nameClass}/train`)
    //     .headers({
    //       "Content-Type": "application/json",
    //       "Ocp-Apim-Subscription-Key": api.keyApi
    //     })
    //     .post()
    //     .json()
    //     console.log('=============train', resTrain);
    //   }),
  
    //   statusTraining: flow(function*(nameClass){
    //     const resStatusTrainning = yield api.StatusTrainning 
    //     .url(`/${nameClass}/training`)
    //     .headers({
    //       "Content-Type": "application/json",
    //       "Ocp-Apim-Subscription-Key": api.keyApi
    //     })
    //     .get()
    //     .json()
    
    //     console.log('==============train status', resStatusTrainning);
    //   }),
  
    //   detectFaces: flow(function*(photo_data){
    //     yield RNFetchBlob.fetch('POST', api.Detect, {
    //       "Content-Type": "application/octet-stream",
    //       "Ocp-Apim-Subscription-Key": api.keyApi
    //     }, photo_data)
    //     .then((res) => {
    //         return res.json();      
    //     })
    //     .then((json) => {
    //         if(json.length){
    //           return json
    //         }else{
    //           console.log(`No face detected`);
    //           return alert("Không tìm thấy khuôn mặt. Vui lòng thử lại");
    //         }
    //         // return this._presence()
    //     })
    //     .catch (function (error) {
    //         console.log(error);
    //         alert('Phát hiện lỗi không kết nối internet.');
    //     });
    //   }),
  
    //   presence: flow(function*(nameClass){
        
    //   }),
  
    //   _presence = async() => {
    //     let ids = this.face_data.map( el => el.faceId )
    //     const resCandidates = await api.Identify
    //     .headers({
    //       "Content-Type": "application/json",
    //       "Ocp-Apim-Subscription-Key": api.keyApi
    //     })
    //     .post({
    //         "largePersonGroupId": nameClass,
    //         "faceIds": ids,
    //         "maxNumOfCandidatesReturned": 50,
    //         "confidenceThreshold": 0.7
    //     })
    //     .json()
    
    //     if(!resCandidates.length){
    //       alert("Không tìm thấy khuôn mặt. Vui lòng thử lại");
    //     }
    
    //     console.log('resCandidates', resCandidates);
        
       
    //     let faceDetected = this.face_data    
        
    //     for ( let i = 0; i < faceDetected.length; i++ ) {
    //       for ( let j = 0; j < resCandidates.length; j++ ) {
    //         if ( faceDetected[i].faceId == resCandidates[j].faceId ){
    //           let candidates = resCandidates[j].candidates;
    //           faceDetected[i].candidates = candidates
    //         }
    //       }
    //     }
    
    //     //=============================================================== List faces in group 
    //     const resList = await api.List 
    //     .headers({
    //       "Content-Type": "application/json",
    //       "Ocp-Apim-Subscription-Key": api.keyApi
    //     })
    //     .url(`/${nameClass}/persons`)
    //     .get()
    //     .json()
    
    //     if(!resList.length){
    //       return console.log('No list response !') 
    //     }
    
    //     this.listFaces = resList
    
    //     for ( let i = 0; i < faceDetected.length; i++ ) {
    //       for ( let j = 0; j < resList.length; j++ ) {
    //         if(faceDetected[i].candidates[0] !== undefined)
    //         {
    //           if ( faceDetected[i].candidates[0].personId == resList[j].personId ){
    //             let name = resList[j].name;
    //             faceDetected[i].name = name
    //           }
    //         }
    //       }
    //     }
    
    //     console.log('====================================');
    //     console.log('data name', faceDetected);
    //     console.log('====================================');
        
    //     return this.faceDetected = faceDetected
    //   }
  
}))




