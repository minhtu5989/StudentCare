import wretch from 'wretch';
import { FACE_URL, BASE_URL } from "../constants/index";
const keyApi = 'f04250c29d264c7cba49441bddff62e5'   //  17/07/2019
const groupName = 'bytuluong'
//===================== API server FACE_URL
const Detect = `${FACE_URL}/detect?returnFaceId=true&returnFaceAttributes=age,gender&recognitionModel=recognition_02&returnRecognitionModel=true`;
const Identify = wretch(`${FACE_URL}/identify`);
const List = wretch(`${FACE_URL}/largepersongroups/${groupName}/persons`);
const CreatePersonId = wretch(`${FACE_URL}/largepersongroups/${groupName}/persons`);
const AddFace = `${FACE_URL}/largepersongroups/${groupName}/persons`;
const StatusTraining = wretch(`${FACE_URL}/largepersongroups/${groupName}/training`);
const Training = wretch(`${FACE_URL}/largepersongroups/${groupName}/train`);

//===================== API server NodeJs
const LogIn = wretch(`${BASE_URL}/api/tuluongV1/customers/LogIn`);
const GetUserInfo = wretch(`${BASE_URL}/api/tuluongV1/customers/GetUserInfo`);
const GetStuInfo = wretch(`${BASE_URL}/api/tuluongV1/students/GetStuInfo`);
const SavePersonId = wretch(`${BASE_URL}/api/tuluongV1/students/SavePersonId`);


export const api = {
    SavePersonId,
    GetUserInfo,
    GetStuInfo,
    LogIn,
    AddFace,
    CreatePersonId,
    List,
    Identify,
    StatusTraining,
    Training,
    Detect,
    keyApi,
    groupName
};




//Exam

// try {
//     await api.SignIn 
//     .url()
//     .headers({
//         "Content-Type": "application/json",
//     })
//     .post({
//         "email": this.state.email,
//         "password": this.state.password,
//     })
//     .json( json => {
//     })
// } catch (error) {
//     console.log('==============Error: ', error)
//     return alert('Lỗi kết nối internet')
// }
