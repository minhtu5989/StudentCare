import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema(
  {
    userName: String,
    password: String,
    role: String,
    email: String,
    holotvn: String,
    tenvn: String,
    avatar: String,
    mobile: String,
    tenlop: String,
    tenns: String,
    ngaysinh: String,
    data: [
      {
        nhomBang: String,
        codeCourse: String,
        courseName: String,
        cr: String, 
        noOfStudent: String, 
        lectureCode: String,
        lecturer: String,
        weekday: String,
        startingSesions: String,
        noOfSecsions: String,
        room: String,
        lopBang: String,
        class: String,
        timeable: String,
        week: String,
        examDate: String,
        phone: String,
        email: String,
        lastName: String,
        firstName: String,
        shs: String,
        teachingDay: String,
        presence: String,
      }
    ],
  },
  { timestamps: true },
);

StudentSchema.index({ userName: "TuLuong_Student" });

export default mongoose.model('Student', StudentSchema);
