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
    personId: String,
    data: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
      },
    ],
  },
  { timestamps: true },
);

StudentSchema.index({ userName: "TuLuong_Student" });

export default mongoose.model('Student', StudentSchema);
