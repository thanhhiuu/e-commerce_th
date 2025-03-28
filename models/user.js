import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Declare the Schema of the Mongo model
const user = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} không phải là email hợp lệ!`,
      },
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);
user.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user?.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

//Export the model
export default mongoose.model('User', user);
