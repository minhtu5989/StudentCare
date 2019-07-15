import mongoose, { Schema } from 'mongoose';

const CustomerSchema = new Schema(
  {
    userName: String,
    password: String,
    role: String,
    avatar: String,
    phone: String,
    name: String,
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
        students: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
          },
        ],
        exist:  [
          {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
          },
        ],
        noExist: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
          },
        ],
        semiExist: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
          },
        ]
      }
    ],
  },
  { timestamps: true },
);

CustomerSchema.index({ userName: "TuLuong_Teacher" });

export default mongoose.model('Customer', CustomerSchema);
