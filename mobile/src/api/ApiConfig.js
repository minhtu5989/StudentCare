import wretch from 'wretch';
import { BASE_URL } from "@constants/index";
const keyApi = 'e0496daba30a41a38dc55e1874cd60c3'   //  13/06/2019


const StatusTranning = `${BASE_URL}/largepersongroups`;
const Detect = `${BASE_URL}/detect?returnFaceId=true&returnFaceAttributes=age,gender`;
const CreateClass = `${BASE_URL}/largepersongroups`;
const Identify = `${BASE_URL}/identify`;

export const api = {
    Identify,
    StatusTranning,
    Detect,
    keyApi,
    CreateClass,
};

