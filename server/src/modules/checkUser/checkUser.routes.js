import { Router } from 'express';

import { 
    logIn,
    register
} from './checkUser.controller';

const routes = Router();

routes.post('/LogIn', logIn);
routes.post('/Register', register);

export default routes;
