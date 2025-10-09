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

    // 🔹 Array de direcciones: cada una con calle, código postal y ciudad
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

    // 🔹 Estado activo/inactivo
    active: {
      type: Boolean,
      default: true,
    },

    // 🔹 Array de métodos de pago: tipo, número, expiración
    paymentMethod: [
      {
        type: { type: String, required: true, trim: true }, // Ej: "Visa", "PayPal"
        number: { type: String, required: true, trim: true },
        expiration: { type: String, required: false, trim: true }
      }
    ],

    // 🔹 Texto libre
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
