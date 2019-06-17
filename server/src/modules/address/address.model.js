import mongoose, { Schema } from 'mongoose';

const AddressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    town: {
        type: String,
        required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    // country:{ 
    //   type: String,
    //   required: true
    // },
    instructions: String,
    geo: {
      type: { type: String },
      coords: [Number],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Address', AddressSchema);







// import mongoose, { Schema } from 'mongoose';

// const TimeableSchema = new Schema(
//   {
//     courseName: {
//       type: String,
//       required: true,
//     },
//     lecturerCode: {
//       type: String,
//       required: true,
//     },
//     lecture: {
//       type: String,
//       required: true,
//     },
//     weekday: {
//       type: String,
//       required: true,
//     },
//     startingSession: {
//       type: String,
//       required: true,
//     },
//     numberOfSession: {
//       type: String,
//       required: true,
//     },
//     room: {
//       type: String,
//       required: true,
//     },
//     class: {
//       type: String,
//       required: true,
//     },
//     timeable: {
//       type: String,
//       required: true,
//     },
//     week: {
//       type: String,
//       required: true,
//     },
//     phone: Number,
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'Teacher',
//     },
//   },
//   { timestamps: true },
// );

// TimeableSchema.index({ email: 1 });

// export default mongoose.model('Timeable', TimeableSchema);

