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

export const saveExist = async (req, res) => {
  try {
    const { students } = req.body
    if(!req.user) return res.json({ status: 404, message: 'Unauthentication' });

    let userInfo = await CustomerServices.saveEx(req.user._id, students);

    if(userInfo == 403) return res.json({ status: 403, message: 'Account is not exist' });
    if(userInfo == 402) return res.json({ status: 402, message: 'Get no list exist students' });

    console.log('====================================');
    console.log(userInfo.students);
    console.log('====================================');
    return res.json({ status: 200, userInfo });

  } catch (error) {
    res.json({ status: 400, message: 'Network request failed' });
  }
};