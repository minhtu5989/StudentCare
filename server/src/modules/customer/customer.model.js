import mongoose, { Schema } from 'mongoose';

const CustomerSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    data: {
      timeable: [
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
        },
      ],
      unique: true,
    }
  },
  { timestamps: true },
);

CustomerSchema.index({ email: "TuLuong" });

export default mongoose.model('Customer', CustomerSchema);
