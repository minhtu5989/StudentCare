import { Router } from 'express';

import { 
    create, 
    getUserInfo, 
    saveNotifiToken 
} from './customer.controller';
import { customerAuth } from './customer';

const routes = Router();

routes.post('/', create);
routes.get('/user', customerAuth, getUserInfo);
routes.post('/user/notifiToken', saveNotifiToken);

export default routes;
