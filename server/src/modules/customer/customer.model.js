import mongoose, { Schema } from 'mongoose';

const CustomerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
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
        teachingDay: String
      }
    ],
  },
  { timestamps: true },
);

CustomerSchema.index({ email: "TuLuong" });

export default mongoose.model('Customer', CustomerSchema);
