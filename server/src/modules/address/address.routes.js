import { Router } from 'express';

import { 
    createAddress, 
    userAddresses,
    updateAddress,
    deleteAddress
} from './address.controller';
import { customerAuth } from '../customer';

const routes = Router();

routes.post('/', customerAuth, createAddress)
routes.get('/', customerAuth, userAddresses)
routes.put('/:_id', customerAuth, updateAddress)
routes.delete('/:_id', customerAuth, deleteAddress)

export default routes;
