import wretch from 'wretch';
import { BASE_URL } from "@constants/index";
const keyApi = 'fad2c0f7b0634885afef3b22da5c2843'   //  02/05/2019


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

