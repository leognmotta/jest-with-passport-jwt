const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  next();
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.getToken = function() {
  return jwt.sign({ userId: this._id }, process.env.SECRET_OR_KEY || 'scretekey', {
    expiresIn: '5h'
  });
};

module.exports = mongoose.model('User', UserSchema);
