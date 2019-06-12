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
