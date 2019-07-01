import { Router } from 'express';

import { 
    register, 
    logIn,
} from './customer.controller';

const routes = Router();

routes.post('/Register', register);
routes.post('/LogIn', logIn);

export default routes;
