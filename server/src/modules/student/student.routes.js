import { Router } from 'express';

import { 
    register, 
    logIn,
    getUserInfo, 
    saveNotifiToken 
} from './student.controller';
import { customerAuth2 } from './student';

const routes = Router();

routes.post('/Register', register);
routes.post('/LogIn', logIn);
routes.get('/GetUser', customerAuth2, getUserInfo);
routes.post('/user/notifiToken', saveNotifiToken);

export default routes;
