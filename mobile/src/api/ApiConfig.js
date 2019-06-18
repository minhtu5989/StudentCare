import wretch from 'wretch';
import { BASE_URL } from "../constants/index";
const keyApi = 'e0496daba30a41a38dc55e1874cd60c3'   //  13/06/2019


const Detect = `${BASE_URL}/detect?returnFaceId=true&returnFaceAttributes=age,gender&recognitionModel=recognition_02&returnRecognitionModel=true`;
const Identify = wretch(`${BASE_URL}/identify`);
const List = wretch(`${BASE_URL}/largepersongroups`);
const PutClass = wretch(`${BASE_URL}/largepersongroups`);
const CreatePersonId = wretch(`${BASE_URL}/largepersongroups`);
const AddFace = `${BASE_URL}/largepersongroups`;
const StatusTranning = wretch(`${BASE_URL}/largepersongroups`);
const Training = wretch(`${BASE_URL}/largepersongroups`);

export const api = {
    AddFace,
    CreatePersonId,
    PutClass,
    List,
    Identify,
    StatusTranning,
    Training,
    Detect,
    keyApi,
};




//Exam

// const res = api.PutClass 
// .headers({
//     "Content-Type": "application/json",
//     "Ocp-Apim-Subscription-Key": api.keyApi
// })
// .url(`/${nameClass}`)
// .put({
//     "name": classObj.lecture,
//     "userData": classObj.lectureCode,
//     "recognitionModel": "recognition_02"
// })
// .error( e => {
//     console.log('error', e);
// })
// .catch( e => { 
//     console.log('error', e);
//     alert('Phát hiện lỗi không kết nối internet.');
// })
// .json()
