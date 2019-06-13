import wretch from 'wretch';
import { BASE_URL } from "@constants/index";
const keyApi = 'e0496daba30a41a38dc55e1874cd60c3'   //  13/06/2019


const StatusTranning = `${BASE_URL}/largepersongroups`;
const Detect = `${BASE_URL}/detect?returnFaceId=true&returnFaceAttributes=age,gender&recognitionModel=recognition_02&returnRecognitionModel=true`;
const CreateClass = `${BASE_URL}/largepersongroups`;
const Identify = wretch(`${BASE_URL}/identify`);
const List = wretch(`${BASE_URL}/largepersongroups/tuluong1/persons`);

export const api = {
    List,
    Identify,
    StatusTranning,
    Detect,
    keyApi,
    CreateClass,
};
