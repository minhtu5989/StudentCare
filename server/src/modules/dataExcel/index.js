import Customer from "../customer/customer.model";
import Student from "../student/student.model";
import { hash, compare } from 'bcryptjs';
import _ from 'lodash';
import { dataStu, dataTea } from "./extractData";
import moment from "moment";

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

export const fetchData = async () => {
    try {
        _.forEach(dataTea, async (el) => {
            const _customer = await Customer.findOne({ userName: el.email });
        // add data
            if(_customer){
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
        
                var dataRange = [];
                startDate = moment(startDate);
                stopDate = moment(stopDate);
                while (startDate <= stopDate) {
                //========================== minus 1 because moment().isoWeekday() returns 1-7 where 1 is Monday and 7 is Sunday
                if(moment(startDate).isoWeekday() == parseInt(el.weekday) -1){
        
                    dataRange.push( moment(startDate).format('YYYY-MM-DD') )
                }
                startDate = moment(startDate).add(1, 'days');
                }
        
                dataRange.forEach( el2 => {
                    el.teachingDay = el2
                    _customer.data.push(el)
                })

                await _customer.save();
            }  

        });

    } catch (error) {
        
    }
}