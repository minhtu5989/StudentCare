import { Router } from 'express';

import { 
    getStuInfo
} from './student.controller';
import { customerAuth } from "../customer";

const routes = Router();

routes.get('/getStuInfo',customerAuth ,getStuInfo);

export default routes;
