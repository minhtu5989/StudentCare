import { Router } from 'express';

import { 
    register, 
    logIn,
    getUserInfo, 
    saveNotifiToken 
} from './student.controller';
import { customerAuth } from './student';

const routes = Router();

routes.post('/Register', register);
routes.post('/LogIn', logIn);
routes.get('/GetUser', customerAuth, getUserInfo);
routes.post('/user/notifiToken', saveNotifiToken);

export default routes;
