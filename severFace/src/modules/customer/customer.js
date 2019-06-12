import Customer from './customer.model';
import { buildCustomerInfo } from './buildCustomerInfo';
import { AuthServices } from '../../services/Auth';

export const customerAuth = async (req, res, next) => {
  const token = AuthServices.getTokenFromHeaders(req);

  if (!token) {
    req.user = null;

    return res.sendStatus(401);
  }

  const customer = await Customer.findById(token.id);

  if (!customer) {
    req.user = null;

    return res.sendStatus(401);
  }

  req.user = customer;

  return next();
};

export const getOrCreateCustomer = async (customerInfo) => {
  try {
    const _customer = await Customer.findOne({ email: customerInfo.email });

    const { ...userInfo } = customerInfo;
    
    console.log("_customer", _customer);
    
    if (!_customer) {
      const customer = await Customer.create({
        ...userInfo
      });
      return customer;
    }

    const emailExist = _customer.find( el => el.email === customerInfo.email )
    if(emailExist){
      return _customer
    }

    await _customer.save();

    return _customer;
    
  } catch (error) {
    throw error;
  }
};

export const me = async userId => {
  try {
    const user = await Customer.findById(userId);

    if (!user) {
      throw new Error('User not exist');
    }

    return user;
  } catch (error) {
    throw error;
  }
};
