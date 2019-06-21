import wretch from 'wretch';
import { FACE_URL, BASE_URL } from "../constants/index";
const keyApi = 'e0496daba30a41a38dc55e1874cd60c3'   //  13/06/2019

//===================== API server FACE_URL
const Detect = `${FACE_URL}/detect?returnFaceId=true&returnFaceAttributes=age,gender&recognitionModel=recognition_02&returnRecognitionModel=true`;
const Identify = wretch(`${FACE_URL}/identify`);
const List = wretch(`${FACE_URL}/largepersongroups`);
const PutClass = wretch(`${FACE_URL}/largepersongroups`);
const CreatePersonId = wretch(`${FACE_URL}/largepersongroups`);
const AddFace = `${FACE_URL}/largepersongroups`;
const StatusTranning = wretch(`${FACE_URL}/largepersongroups`);
const Training = wretch(`${FACE_URL}/largepersongroups`);

//===================== API server BASE_URL
const LogIn = wretch(`${BASE_URL}/api/v1/customers/LogIn`);
const Register = wretch(`${BASE_URL}/api/v1/customers/Register`);


export const api = {
    Register,
    LogIn,
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

// const res = await api.SignIn 
//     .url()
//     .headers({
//         "Content-Type": "application/json",
//     })
//     .post({
//         "email": this.state.email,
//         "password": this.state.password,
//     })
//     .error( e => {
//         console.log('error', e);
//     })
//     .json()

//     if(!res) return alert('Phát hiện lỗi không kết nối internet.');
//     console.log('response', res);
