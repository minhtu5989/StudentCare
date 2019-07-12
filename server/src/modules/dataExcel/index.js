import excelToJson from 'convert-excel-to-json';
import Customer from "../customer/customer.model";
import { hash, compare } from 'bcryptjs';

const result = excelToJson({
    sourceFile: '/Applications/WorkSpace/StudentCare/server/src/modules/dataExcel/teachers.xls'
})

result.teachers.map( el => {
    el.nhomBang = el.D 
    delete el.D

    el.codeCourse = el.E
    delete el.E

    el.courseName = el.F 
    delete el.F

    el.cr = el.G
    delete el.G

    el.noOfStudent = el.H
    delete el.H

    el.lectureCode = el.I
    delete el.I

    el.lecturer = el.J
    delete el.J

    el.weekday = el.K
    delete el.K

    el.startingSesions = el.L
    delete el.L

    el.noOfSecsions = el.M
    delete el.M

    el.room = el.N
    delete el.N

    el.lopBang = el.O
    delete el.O

    el.class = el.P
    delete el.P

    el.timeable = el.Q
    delete el.Q

    el.week = el.R
    delete el.R

    // el.nope = el.s
    delete el.R

    el.examDate = el.T
    delete el.T

    el.phone = el.U
    delete el.U

    if(!el.V){
        el.V = 'null'
    }

    el.email = el.V
    delete el.V

    el.lastName = el.W
    delete el.W

    el.firstName = el.X
    delete el.X

    el.shs = el.Y
    delete el.Y
})

export const tbkGV = () =>{
    try {
        const existUserName = []
        result.forEach(async(el) => {
            const _customer = await Customer.findOne({ userName : el.phone });
            if(_customer){
                existUserName.push(_customer.lecturer)
            }   
            const encryptedPassword = await hash(el.phone, 16);
            const bigDataGV = await Customer.create({
                userName: el.phone,
                password: encryptedPassword,
                role: 'teacher',
                name: el.lecturer
            });
        });

        if(existUserName.length > 0){
            return res.json({ status: 301, message: 'Account was exist', existUserName });
        }
        
        return res.json({ status: 200, message: 'Sign up successful' });
    
    } catch (error) {
    throw error;
    }
}
