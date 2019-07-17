import { Router } from 'express';

import { 
    getStuInfo,
    savePersonId
} from './student.controller';
import { customerAuth } from "../customer";

const routes = Router();

routes.get('/GetStuInfo',customerAuth ,getStuInfo);
routes.post('/SavePersonId',customerAuth ,savePersonId);

export default routes;
