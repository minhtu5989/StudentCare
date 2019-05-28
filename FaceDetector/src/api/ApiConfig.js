import wretch from 'wretch';
import { BASE_URL } from "@constants/index";
const keyApi = 'b7cad7b177c24a1294c4c743a3a0e3f0'   //  26/5


const StatusTranning = wretch(`${BASE_URL}/largepersongroups`);
const Detect = wretch(`${BASE_URL}/detect`);
const CreateClass = wretch(`${BASE_URL}/largepersongroups`);

export const api = {
    StatusTranning,
    Detect,
    keyApi,
    CreateClass,
};

