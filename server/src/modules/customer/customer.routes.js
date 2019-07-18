import { Router } from 'express';

import { 
    logIn,
    getUserInfo,
    saveExist
} from './customer.controller';
import { customerAuth } from "./customer";

const routes = Router();

routes.post('/LogIn', logIn);
routes.get('/GetUserInfo',customerAuth ,getUserInfo);
routes.post('/SaveExist',customerAuth ,saveExist);

export default routes;
