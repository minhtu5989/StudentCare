import excelToJson from 'convert-excel-to-json';

const result = excelToJson({
    sourceFile: '/Applications/WorkSpace/DOAN/StudentCare/server/src/modules/dataExcel/TKB.xlsx'
})

result.timeable.map( el => {
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

    el.email = el.V
    delete el.V

    el.lastName = el.W
    delete el.W

    el.firstName = el.X
    delete el.X

    el.shs = el.Y
    delete el.Y
})

export const dataExcel = result.timeable
