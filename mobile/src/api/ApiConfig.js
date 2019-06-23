import wretch from 'wretch';
import { FACE_URL, BASE_URL } from "../constants/index";
const keyApi = '64f4e3a362394d159d85d2aa6256ca4c'   //  21/06/2019

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
const GetTKB = wretch(`${BASE_URL}/tkbHutech`);

export const api = {
    GetTKB,
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
<<<<<<< HEAD
            
//     })
// } catch (error) {
//     console.log('==============Error: ', error)
//     return alert('Phát hiện lỗi không kết nối internet.')
// }
=======

//     })
// } catch (error) {
//     console.log('................Error:   ', error)
//     return alert('Phát hiện lỗi không kết nối internet.');
// }
>>>>>>> handle tkb to email done
