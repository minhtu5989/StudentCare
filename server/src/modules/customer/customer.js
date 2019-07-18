import Customer from './customer.model';
import Student from '../student/student.model';
import { AuthServices } from '../../services/Auth';
import { hash, compare } from 'bcryptjs';
import _ from 'lodash';

export const customerAuth = async (req, res, next) => {
  const token = AuthServices.getTokenFromHeaders(req);

  if (!token) {
    req.user = null;
    return res.sendStatus(401);
  }

  let _customer = await Customer.findById(token.id);

  if (!_customer) {
    _customer = await Student.findById(token.id);

    if(!_customer){
      req.user = null;
      return res.sendStatus(402);
    }
  }

  req.user = _customer;

  return next();
};

export const logInCustomer = async (userName, password) => {
  try {
    if(!userName || !password) return 303

    let result = await Customer.findOne({ userName });
    
    if (!result){
      result = await Student.findOne({ userName });
    }
    password = JSON.stringify(password)
    const same = await compare(password, result.password);
    if (!same) return 302
    return result

  } catch (error) {
    throw error;
  }
}

export const iamTea = async userId => {
  try {
    let user = await Customer.findById(userId);

    if (!user) return 404

    let userInfo = user.toObject();
    delete userInfo.password;
    userInfo = { ...userInfo }

    return userInfo;
    
  } catch (error) {
    throw error;
  }
};

export const iamStu = async userId => {
  try {
    let user = await Student.findById(userId);
    
    if (!user) return 404
    
    let userInfo = user.toObject();
    delete userInfo.password;
    userInfo = { ...userInfo }

    return userInfo;
    
  } catch (error) {
    throw error;
  }
};

export const saveEx = async (userId, obj) => {
  try {
    let user = await Customer.findById(userId);

    if (!user) return 403

    if(!students) return 402

    console.log('====================================');
    console.log(obj);
    console.log('====================================');

    // user.data.forEach(el1 => {
    //   el.students.forEach(el2 => {
    //     if(el2._id.toString() == obj._id.toString()){
    //       el2.exist  = obj.exist
    //     }
    //   })
    // });

    user.data[index].students.forEach(el => {
      students.forEach(el2 => {
        if(el._id.toString() == el2._id.toString()){
          el.exist  = el2.exist
        }
      });
    });

    user.save()

    let userInfo = user.toObject();
    delete userInfo.password;
    userInfo = { ...userInfo }

    return userInfo;
    
  } catch (error) {
    throw error;
  }
};