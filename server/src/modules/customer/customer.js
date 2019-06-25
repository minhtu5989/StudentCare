import Customer from './customer.model';
import { AuthServices } from '../../services/Auth';
import { hash, compare } from 'bcryptjs';
import { dataExcel } from "../../modules/dataExcel/index";
import moment from "moment";
export const customerAuth = async (req, res, next) => {
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

export const registerCustomer = async (data) => {
  try {
    const _customer = await Customer.findOne({ email: data.email });
    
    if(_customer) throw Error('Email was exist')

    const encryptedPassword = await hash(data.password, 8);
    const result = await Customer.create({
      email: data.email,
      password: encryptedPassword,
    });

    return result

  } catch (error) {
    throw error;
  }
}

export const logInCustomer = async (data) => {
  try {
    const result = await Customer.findOne({ email: data.email });
    
    if (!result) return 301 
    const same = await compare(data.password, result.password);
    if (!same) return 302
    return result

  } catch (error) {
    throw error;
  }
}

export const me = async userId => {
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
    let userInfo = user.toObject();
    delete userInfo.password;
    userInfo = { ...userInfo, data: result }

    return userInfo;
  } catch (error) {
    throw error;
  }
};
