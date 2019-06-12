import * as Yup from 'yup';

import { PROVIDER_ENUM } from './customer.model';
import { AuthProvider } from '../../services/authProvider';
import * as CustomerServices from './customer';
import { AuthServices } from '../../services/Auth';

export const create = async (req, res) => {
  const { token, provider } = req.body;

  const bodySchema = Yup.object().shape({
    token: Yup.string().required(),
    provider: Yup.string()
      .oneOf(PROVIDER_ENUM)
      .required(),
  });

  try {
    await bodySchema.validate({ token, provider });

    let data;

    if (provider === 'FACEBOOK') {
      data = await AuthProvider.Facebook.authAsync(token);
    } else if (provider === 'GOOGLE') {
      data = await AuthProvider.Google.authAsync(token);
    } else {
      res.sendStatus(400);
    }

    const customer = await CustomerServices.getOrCreateCustomer(data, provider);

    const jwtToken = AuthServices.createToken(customer);

    res.status(200).json({ token: jwtToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
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

