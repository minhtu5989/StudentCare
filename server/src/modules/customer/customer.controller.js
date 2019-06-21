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
    return res.send({ success: true, token });

  } catch (error) {
    res.send({ success: false, message: error.message });
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
    if(!result) throw Error('Can not log in now. Please try later.')
    const token = await AuthServices.createToken(result);
    return res.send({ success: true, token });

  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};



export const getUserInfo = async (req, res) => {
  try {
    if (req.user) {
      const userInfo = await CustomerServices.me(req.user._id);

      res.status(200).json(userInfo);
    } else {
      res.status(400).json({ message: 'No User' });
    }
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
    throw error;
  }
};

