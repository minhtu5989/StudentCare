import excelToJson from 'convert-excel-to-json';

const extractTea = excelToJson({
    sourceFile: '/Applications/WorkSpace/StudentCare/server/src/modules/dataExcel/data/teachers.xlsx'
})
const extractStu = excelToJson({
    sourceFile: '/Applications/WorkSpace/StudentCare/server/src/modules/dataExcel/data/students.xlsx'
})

extractTea.teachers.map( el => {
    el.nhomBang = el.A
    delete el.A

    el.codeCourse = el.B
    delete el.B

    el.courseName = el.C
    delete el.C

    el.cr = el.D
    delete el.D

    el.noOfStudent = el.E
    delete el.E

    el.lectureCode = el.F
    delete el.F

    el.lecturer = el.G
    delete el.G

    el.weekday = el.H
    delete el.H

    el.startingSesions = el.I
    delete el.I

    el.noOfSecsions = el.J
    delete el.J

    el.room = el.K
    delete el.K

    el.lopBang = el.L
    delete el.L

    el.class = el.M
    delete el.M

    el.timeable = el.N
    delete el.N

    el.week = el.O
    delete el.O

    // el.nope = el.s
    delete el.P

    el.examDate = el.Q
    delete el.Q

    el.phone = el.R
    delete el.R

    if(!el.S){
        el.S = 'null'
    }
    el.email = el.S
    delete el.S

    el.lastName = el.T
    delete el.T

    el.firstName = el.U
    delete el.U

    el.shs = el.V
    delete el.V
})

extractStu.students.map( el => {
    el.mssv = el.A
    delete el.A

    el.holotvn = el.B
    delete el.B

    el.tenvn = el.C
    delete el.C

    el.ngaysinh = el.D
    delete el.D

    if(!el.E){
        el.gioitinh = 'male'
        delete el.E
    }
    else {
        el.gioitinh = 'female'
        delete el.E
    }
    
    delete el.F

    el.tenns = el.G
    delete el.G

    if(!el.H){
        el.H = 'null'
    }
    el.ghichu = el.H
    delete el.H

    el.tenlop = el.I
    delete el.I

    if(!el.J){
        el.J = 'null'
    }
    el.dienthgd = el.J
    delete el.J

    el.dienthll = el.K
    delete el.K

    el.mobile = el.L
    delete el.L

    el.khoahoc = el.M
    delete el.M

    el.khoafull = el.N
    delete el.N

    el.makh = el.O
    delete el.O

    el.mang = el.P
    delete el.P

    el.mahedt = el.Q
    delete el.Q

    el.email = el.R
    delete el.R

    el.tenkhvn = el.S
    delete el.S

    el.tenngvn = el.T
    delete el.T

    el.tendtvn = el.U
    delete el.U

    delete el.V

    delete el.W

    delete el.X

})

export const dataTea = extractTea.teachers
export const dataStu = extractStu.students