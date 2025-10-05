import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
    },
    shippingAddress: {
      type: String,
      required: false,
      trim: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
