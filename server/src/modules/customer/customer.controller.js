import * as Yup from 'yup';
import * as CustomerServices from './customer';
import { AuthServices } from '../../services/Auth';

export const logIn = async (req, res) => {
  const { userName, password } = req.body;

  const bodySchema = Yup.object().shape({
    userName: Yup.string().required(),
    password: Yup.string().required(),
  });

  try {
    await bodySchema.validate({ userName, password });

    let result = await CustomerServices.logInCustomer(userName, password)

    if(result == 301) return res.json({ status: 301, message: 'Account does not exist' });
    if(result == 302) return res.json({ status: 302, message: 'Wrong password' });
    if(result == 303) return res.json({ status: 303, message: 'Pealse do not empty' });
    if(!result) throw new Error

    const token = await AuthServices.createToken(result);
    return res.json({ status: 200 , token });

  } catch (error) {
    res.json({ status: 400, message: 'Network request failed' });
  }
};

export const getUserInfo = async (req, res) => {
  try {

    if(!req.user) return res.json({ status: 404, message: 'Unauthentication' });

    let userInfo = await CustomerServices.iamTea(req.user._id);
    if(userInfo == 404){
      userInfo = await CustomerServices.iamStu(req.user._id);
      if(userInfo == 404){
        return res.json({ status: 404, message: 'Unauthentication' }); 
      }
      return res.json({ status: 200, userInfo });
    } 
    return res.json({ status: 200, userInfo });

  } catch (error) {
    res.json({ status: 400, message: 'Network request failed' });
  }
};