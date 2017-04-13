import mongoose from 'mongoose';

import crypto from 'crypto';
import async from 'async';
import util from 'util';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username:{
    type: String,
    unique:true,
    required: true
  },
  usertype:{
    type: String,
    required: true
  },
  usergroup:{
    type: String,
    required: true
  },
  hashedPassword:{
    type: String,
    required: true
  },
  salt:{
    type: String,
    required: true
  },
  email:{
    type: String
  },
  avatar:{
    type: String
  },
  slogan:{
    type: String,
  },
  updateDate:{
    type: Date,
    default: Date.now
  },
  created:{
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.encryptPassword = function(password) {
    //console.log(password);
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){return this._plainPassword; });

UserSchema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};


UserSchema.statics.authorize = function(username, password, callback) {
  var User = this;

  async.waterfall([
    function(callback) {
      User.findOne({username: username}, callback);
    },
    function(user, callback) {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user);
        } else {
          callback(new AuthError("Пароль неверен"));
        }
      }else{
        callback(new AuthError("Пользователь не найден"));
      }
    }
  ], callback);
};

UserSchema.statics.register = function(username, password, repassword, callback) {
  if (password === repassword) {
    var User = this;

    async.waterfall([
      function(callback) {
        User.findOne({username: username}, callback);
      },
      function(user, callback) {
        if (user) {
          callback(new AuthError("Пользователь с таким именем уже есть!"));
        } else {
          var user = new User({username: username, password: password, usertype: 1, usergroup: 'no-group' });
          user.save(function(err) {
            if (err) return callback(err);
            callback(null, user);
          });
        }
      }
    ], callback);
  }else{
    callback(new AuthError("Пароли не совпадают"));
  };

};

UserSchema.User = mongoose.model('User', UserSchema);


export function AuthError(message){
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

UserSchema.AuthError = AuthError;
