import { Router } from 'express';

import { 
    logIn,
} from './checkUser.controller';

const routes = Router();

routes.post('/LogIn', logIn);

export default routes;
