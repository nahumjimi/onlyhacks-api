const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [EMAIL_PATTERN, 'Email is not valid'],
      trim: true,
      lowercase: true,
      unique: true
    },
    password:{
      type: String,
      required: [true, 'Password is required'],
      minLength: 8,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;

        return ret
      }
    }
  }
);

UserSchema.pre('save', function(next){
  if(this.isModified('password')){
    bcrypt.hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash;
        next()
      })
  } else {
    next()
  }
})

UserSchema.methods.checkPassword = function (passwordToCompare) {
  return  bcrypt.compare(passwordToCompare, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;