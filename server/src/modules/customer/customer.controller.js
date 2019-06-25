import * as Yup from 'yup';

import * as CustomerServices from './customer';
import { AuthServices } from '../../services/Auth';

export const register = async (req, res) => {
  const { email, password } = req.body;

  const bodySchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  try {

    await bodySchema.validate({ email, password });
    let data = { email, password}
    const result = await CustomerServices.registerCustomer(data);
    if(!result) throw Error('Can not register now. Please try later.')

    const token = await AuthServices.createToken(result);
    return res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  const bodySchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  try {

    await bodySchema.validate({ email, password });
    let data = { email, password}
    let result = await CustomerServices.logInCustomer(data)
    if(result == 301) return res.json({ success: false, message: 'Email was not exist' });
    if(result == 302) return res.json({ success: false, message: 'Wrong password' });
    if(!result) throw new Error
    const token = await AuthServices.createToken(result);
    return res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(200).json({ success: true, message: 'Network request failed' });
  }
};

export const getUserInfo = async (req, res) => {
  try {

    if(!req.user) throw new Error('No User');
    const userInfo = await CustomerServices.me(req.user._id);
    if(userInfo == 401) throw new Error('User not exist');
    res.status(200).json(userInfo);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const saveNotifiToken = async (req, res) => {
  try {
    
    const result = await CustomerServices.getNotifiToken(req.body._id, req.body.token);

    if(result === 203){
      res.status(203).json({ message: 'Notification token existed !' });
    }

    return res.status(202).json({ message: 'Save token successful !' });

  } catch (error) {
    console.log('error', error);
    res.status(400).json({ message: error.message });
  }
};

