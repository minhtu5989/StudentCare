import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true
    },
    password: String,
    role: String,
    email: String,
    holotvn: String,
    tenvn: String,
    avatar: String,
    mobile: String,
    lop: String,
    tenns: String,
    ngaysinh: String,
  },
  { timestamps: true },
);

StudentSchema.index({ email: "TuLuong_Student" });

export default mongoose.model('Student', StudentSchema);
