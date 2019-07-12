import { Router } from 'express';

import { 
    register, 
    logIn,
    getUserInfo
} from './customer.controller';
import { customerAuth } from "./customer";

const routes = Router();

routes.post('/Register', register);
routes.post('/LogIn', logIn);
routes.get('/GetUser',customerAuth ,getUserInfo);

export default routes;
