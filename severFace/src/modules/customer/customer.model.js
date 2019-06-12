import mongoose, { Schema } from 'mongoose';

export const PROVIDER_ENUM = ['FACEBOOK', 'GOOGLE'];

const CustomerSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    lecturerCode: {
      type: String,
      required: true,
    },
    lecture: {
      type: String,
      required: true,
    },
    weekday: {
      type: String,
      required: true,
    },
    startingSession: {
      type: String,
      required: true,
    },
    numberOfSession: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    timeable: {
      type: String,
      required: true,
    },
    week: {
      type: String,
      required: true,
    },
    phone: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatarUrl: String,
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

CustomerSchema.index({ email: 1 });

export default mongoose.model('Customer', CustomerSchema);
