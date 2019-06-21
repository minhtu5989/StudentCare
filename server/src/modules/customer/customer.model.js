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
    info: {
      courseName: String,
      courseCode: String, 
      lecturerCode: String,
      lecture: String,
      weekday: String,
      startingSession: String,
      numberSession: String,
      room: String,
      class: String,
      timeable: String,
      week: String,
      phone: String,
    },
  },
  { timestamps: true },
);

CustomerSchema.index({ email: "TuLuong" });

export default mongoose.model('Customer', CustomerSchema);
