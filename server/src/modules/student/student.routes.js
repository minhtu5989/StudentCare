import { Router } from 'express';

import { 
    getUserInfo, 
} from './student.controller';
import { studentAuth } from './student';

const routes = Router();

routes.get('/GetUser', studentAuth, getUserInfo);

export default routes;
