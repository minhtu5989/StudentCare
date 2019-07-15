import Customer from "../customer/customer.model";
import Student from "../student/student.model";
import { hash, compare } from 'bcryptjs';
import _ from 'lodash';
import { dataStu, dataTea } from "./extractData";

export const register = () => {
    try {
    //=============================== register & add data for teachers
        _.forEach(dataTea, async (el) => {
            let _customer = await Customer.findOne({ userName: el.email });
            if(!_customer){
            let pass = JSON.stringify(el.email)
                
    // create new user
                let encryptedPassword = await hash( pass, 8);
                await Customer.create({
                    userName: el.email,
                    password: encryptedPassword,
                    role: 'teacher',
                    name: el.lecturer,
                    phone: el.phone,
                });
            
            }
        });
        
    // =============================== register & add data for students
        _.forEach(dataStu, async (el) => {
            let _customer = await Student.findOne({ userName: el.mssv });
            let pass = JSON.stringify(el.mssv)
            if(!_customer){
    // create new user
                let encryptedPassword = await hash(pass, 8);
                await Student.create({
                    userName: el.mssv,
                    password: encryptedPassword,
                    role: 'student',
                    holotvn: el.holotvn,
                    tenvn: el.tenvn,
                    email: el.email,
                    mobile: el.mobile,
                    tenlop: el.tenlop,
                    tenns: el.tenns,
                    ngaysinh: el.ngaysinh,
                });
            }
        });
    } catch (error) {
        throw error;
    }
}

export const fetchData = () => {
    try {
        _.forEach(dataTea, async (el) => {
            const _customer = await Customer.findOne({ userName: el.email });
        // add data
            if(_customer){
                _customer.data.push(el)
                await _customer.save();
            }  
        });
    } catch (error) {
        
    }
}