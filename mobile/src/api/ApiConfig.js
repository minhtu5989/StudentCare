import wretch from 'wretch';
import { FACE_URL, BASE_URL } from "../constants/index";
const keyApi = 'b23d0bcbba4f4e9ba7f7b114010e8eda'   //  04/07/2019

//===================== API server FACE_URL
const Detect = `${FACE_URL}/detect?returnFaceId=true&returnFaceAttributes=age,gender&recognitionModel=recognition_02&returnRecognitionModel=true`;
const Identify = wretch(`${FACE_URL}/identify`);
const List = wretch(`${FACE_URL}/largepersongroups`);
const PutClass = wretch(`${FACE_URL}/largepersongroups`);
const CreatePersonId = wretch(`${FACE_URL}/largepersongroups`);
const AddFace = `${FACE_URL}/largepersongroups`;
const StatusTraining = wretch(`${FACE_URL}/largepersongroups`);
const Training = wretch(`${FACE_URL}/largepersongroups`);

//===================== API server NodeJs
const LogIn = wretch(`${BASE_URL}/api/tuluongV1/customers/LogIn`);
const GetUserInfo = wretch(`${BASE_URL}/api/tuluongV1/customers/GetUserInfo`);
const GetStuInfo = wretch(`${BASE_URL}/api/tuluongV1/students/GetStuInfo`);

export const api = {
    GetUserInfo,
    GetStuInfo,
    LogIn,
    AddFace,
    CreatePersonId,
    PutClass,
    List,
    Identify,
    StatusTraining,
    Training,
    Detect,
    keyApi,
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
//     return alert('Phát hiện lỗi không kết nối internet.')
// }
