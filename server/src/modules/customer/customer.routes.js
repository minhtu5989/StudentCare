import { Router } from 'express';

import { 
    logIn,
    getUserInfo
} from './customer.controller';
import { customerAuth } from "./customer";

const routes = Router();

routes.post('/LogIn', logIn);
routes.get('/GetUserInfo',customerAuth ,getUserInfo);

export default routes;
