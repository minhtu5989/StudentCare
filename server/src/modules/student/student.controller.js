import * as Yup from 'yup';

import * as CustomerServices from './student';
import { AuthServices } from '../../services/Auth';

// export const register = async (req, res) => {
//   const { userName, password, name } = req.body;

//   const bodySchema = Yup.object().shape({
//     userName: Yup.string().required(),
//     password: Yup.string().required(),
//     name: Yup.string().required(),
//   });

//   try {
//     await bodySchema.validate({ userName, password, name });

//     const result = await CustomerServices.registerCustomer(userName, password, name);
//     if(!result) throw new Error
//     if(result == 301) res.json({ status: 301, message: 'Email was exist' });

//     const token = await AuthServices.createToken(result);
//     return res.json({ status: 200 , token });

//   } catch (error) {
//     res.json({ status: 400, message: 'Network request failed' });
//   }
// };

// export const logIn = async (req, res) => {
//   const { userName, password } = req.body;

//   const bodySchema = Yup.object().shape({
//     userName: Yup.string().required(),
//     password: Yup.string().required(),
//   });

//   try {
//     await bodySchema.validate({ userName, password });

//     let result = await CustomerServices.logInCustomer(userName, password)

//     if(result == 301) return res.json({ status: 301, message: 'Account does not exist' });
//     if(result == 302) return res.json({ status: 302, message: 'Wrong password' });
//     if(result == 303) return res.json({ status: 303, message: 'Pealse do not empty' });
//     if(!result) throw new Error

//     const token = await AuthServices.createToken(result);
//     return res.json({ status: 200 , token });

//   } catch (error) {
//     res.json({ status: 400, message: 'Network request failed' });
//   }
// };

// export const getUserInfo = async (req, res) => {
//   try {
//     if(!req.user) return res.json({ status: 401, message: 'No User' });

//     const userInfo = await CustomerServices.me(req.user._id);

//     if(userInfo == 401) return res.json({ status: 402, message: 'User not exist' }); 
//     res.json({ status: 200, userInfo });

//   } catch (error) {
//     res.json({ status: 400, message: 'Network request failed' });
//   }
// };

// export const saveNotifiToken = async (req, res) => {
//   try {
    
//     const result = await CustomerServices.getNotifiToken(req.body._id, req.body.token);

//     if(result === 203){
//       res.status(203).json({ message: 'Notification token existed !' });
//     }

//     return res.status(202).json({ message: 'Save token successful !' });

//   } catch (error) {
//     console.log('error', error);
//     res.status(400).json({ message: error.message });
//   }
// };

