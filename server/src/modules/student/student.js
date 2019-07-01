import Customer from './student.model';
import { AuthServices } from '../../services/Auth';
import { hash, compare } from 'bcryptjs';
import { dataExcel } from "../dataExcel/index";
import moment from "moment";

export const customerAuth2 = async (req, res, next) => {
  const token = AuthServices.getTokenFromHeaders(req);

  if (!token) {
    req.user = null;

    return res.sendStatus(401);
  }

  const customer = await Customer.findById(token.id);

  if (!customer) {
    req.user = null;

    return res.sendStatus(402);
  }

  req.user = customer;

  return next();
};

export const registerCustomer3 = async (email, password) => {
  try {
    const _customer = await Customer.findOne({ email });
    
    if(_customer) return 301

    const encryptedPassword = await hash(password, 8);
    const result = await Customer.create({
      email: email,
      password: encryptedPassword,
    });

    return result

  } catch (error) {
    throw error;
  }
}

export const logInCustomer3 = async (data) => {
  try {
    if(!data.email || !data.password) return 303

    const result = await Customer.findOne({ email: data.email });
    
    if (!result) {
      
      return 301 
    }
    const same = await compare(data.password, result.password);
    if (!same) return 302
    return result

  } catch (error) {
    throw error;
  }
}

export const me2 = async userId => {
  try {
    const user = await Customer.findById(userId);
    if (!user) return 401

    let dataFilter = []
    dataExcel.forEach( el => {
    if(el.email == user.email)
        dataFilter.push(el)
    })
        
    let result = []
    dataFilter.forEach( el =>{
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
        el = { ...el, teachingDay: el2 }
        result.push(el)
      })
    })
    // console.log('result-===========',result);
    Object.keys(result).forEach(key => {
        user.data[key] = result[key];
    });

    await user.save();

    let userInfo = user.toObject();
    delete userInfo.password;
    userInfo = { ...userInfo }

    return userInfo;
    
  } catch (error) {
    throw error;
  }
};
