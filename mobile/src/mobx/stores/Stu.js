import { types, flow } from 'mobx-state-tree';
import RNFetchBlob from 'react-native-fetch-blob';

import { api } from '../../api/ApiConfig'
import { StudentModel } from "../models/Student";
import { stores } from '../stores';

export const StuStore = types
.model(`stuStore`,{
  student: types.maybeNull(StudentModel),
})
.actions(self => ({
  getStu: flow(function*(){
    try {
      const token = yield stores.authStore.verifyToken()
      const res = yield api.GetStuInfo
        .headers({ 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        })
        .get()
        .json()

      if(!res) throw new Error

      self.student = res.students

      return self.createFaceId()

    } catch (error) {
      console.log('................Error:   ', error)
    }
  }),

  createFaceId: flow(function*(){
    if(self.student.personId == null){
      try {
        const resId = yield api.CreatePersonId 
        .headers({
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": api.keyApi
        })
        .post({
            "name": self.student.userName,
            "userData": 'bytuluong',
            "recognitionModel": "recognition_02"
        })
        .json()

        console.log(`resId`, resId);


        if(!resId.personId) throw new Error

        console.log('Create ID successful !');
        self.student.personId = resId.personId

        // ------------------------------- save personId
        const token = yield stores.authStore.verifyToken()
        const resSaveId = yield api.SavePersonId 
        .auth(`Bearer ${token}`)
        .post({
            "personId": self.student.personId
        })
        .json()

        if(!resSaveId) throw new Error

      } catch (error) {
        console.log('error: ',error);
        alert('Lỗi kết nối internet')
      }
    }
  }),

  addFace: flow(function*(photo_data){
    yield RNFetchBlob.fetch('POST', `${api.AddFace}/${self.student.personId}/persistedFaces?detectionModel=detection_02`, {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": api.keyApi
    }, photo_data)
    .then((res) => {
        return res.json();      
    })
    .then((json) => {
        if(json.persistedFaceId){
          return true;
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
        return alert('Lỗi kết nối internet');
    });
  }),
}))




