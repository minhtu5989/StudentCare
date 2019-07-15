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
        count: {
          exist:  [
            {
              type: Schema.Types.ObjectId,
              ref: 'Student',
            },
          ],
          noExist: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Student',
            },
          ],
          semiExist: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Student',
            },
          ]
        },
        students: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      }
    ],
  },
  { timestamps: true },
);

CustomerSchema.index({ userName: "TuLuong_Teacher" });

export default mongoose.model('Customer', CustomerSchema);
