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

    // 🔹 Nuevo campo
    personal_id: {
      type: String,
      required: false,
      trim: true,
    },

    phone: {
      type: String,
      required: false,
    },
    shippingAddress: [
      {
        street: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true }
      }
    ],
    admin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    paymentMethod: [
      {
        type: { type: String, required: true, trim: true },
        number: { type: String, required: true, trim: true },
        expiration: { type: String, required: false, trim: true }
      }
    ],
    additionalData: {
      type: String,
      required: false,
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const User = mongoose.model("User", userSchema);

export default User;
