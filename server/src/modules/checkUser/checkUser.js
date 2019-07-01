import Customer from '../customer/customer.model';
import Student from '../student/student.model';

import { hash, compare } from 'bcryptjs';

export const registerCustomer4 = async (userName, password) => {
  try {
    if(isNaN(userName)){
      const _teacher = await Customer.findOne({ emai:userName });
      if(_teacher) return 301
      
      const encryptedPassword = await hash(password, 8);
      const result = await Customer.create({
        email: userName,
        password: encryptedPassword,
        role: 'teacher'
      });
      return result
    }
    else {
      const _student = await Student.findOne({ mssv:userName });
      if(_student) return 301
      const encryptedPassword = await hash(password, 8);
      const result = await Student.create({
        mssv: userName,
        password: encryptedPassword,
        role: 'student'
      });
      return result
    }
    
  } catch (error) {
    throw error;
  }
}

export const logInCustomer4 = async (data) => {
  try {
    if(!data.email || !data.password) return 303

    const result = await Customer.findOne({ email: data.email });
    
    if (!result) return 301 
    const same = await compare(data.password, result.password);
    if (!same) return 302
    return result

  } catch (error) {
    throw error;
  }
}