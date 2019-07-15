import Customer from './customer.model';
import Student from '../student/student.model';
import { AuthServices } from '../../services/Auth';
import { hash, compare } from 'bcryptjs';
import _ from 'lodash';
import moment from "moment";

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

    if (!user) return 401
    
    const result = []
    let _user = user
    _.forEach(_user.data, async (el) => {

      const timeable = JSON.stringify(el.timeable)
      let startDate = timeable.slice(1,9)
      let yy = startDate.slice(6,8)
      startDate = startDate.slice(0,6)
      startDate = startDate + 20 + yy

      let stopDate = timeable.slice(12, 20) 
      yy = stopDate.slice(6,8)
      stopDate = stopDate.slice(0,6)
      stopDate = stopDate + 20 + yy
      // console.log(`startDate ${startDate} stopDate ${stopDate}`);

      //========================== handle date range
      startDate = startDate.split("/").reverse().join("-");
      stopDate = stopDate.split("/").reverse().join("-");

      var dateRange = [];
      startDate = moment(startDate);
      stopDate = moment(stopDate);
      while (startDate <= stopDate) {
      //========================== minus 1 because moment().isoWeekday() returns 1-7 where 1 is Monday and 7 is Sunday
        if(moment(startDate).isoWeekday() == parseInt(el.weekday) -1){

          dateRange.push( moment(startDate).format('YYYY-MM-DD') )
        }
        startDate = moment(startDate).add(1, 'days');
      }

      dateRange.forEach( el2 => {
          el.teachingDay = el2
          console.log('====================================');
          console.log(el);
          console.log('====================================');
          // result.push(el)
      })
    })

    // console.log('================day====================');
    // console.log(result);
    // console.log('===============day=====================');
    Object.keys(_user.data).forEach(key => {
        user.data[key] = _user.data[key];
    });
    // user.data.forEach(async el => {
    //   let arrStu = []
    //   let students = await Student.find({ tenlop: el.class });
    //   students.forEach(el => {
    //     arrStu.push(el._id)
    //   })
    //   el.students = students
    // });

    await user.save();

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

    if (!user) return 401
    
    let userInfo = user.toObject();
    delete userInfo.password;
    userInfo = { ...userInfo }

    return userInfo;
    
  } catch (error) {
    throw error;
  }
};