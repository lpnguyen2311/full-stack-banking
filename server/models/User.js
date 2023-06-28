import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      amount: Number,
      type: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    bcrypt.genSalt(10, function (saltErorr, salt) {
      if (saltErorr) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hasErrors, hash) {
          if (hasErrors) {
            return next(hasErrors);
          }
          user.password = hash;
          return next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (usersPassword, cb) {
  bcrypt.compare(usersPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model("user", UserSchema);
