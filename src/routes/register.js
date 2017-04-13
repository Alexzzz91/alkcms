import mongoose from 'mongoose';
import async from 'async';

import * as userModel from '../models/User';

import * as error from '../error';

const User = mongoose.model("User");

const AuthError = userModel.AuthError;

const HttpError = error.HttpError;

exports.get = function(req, res) {
  res.render('login');
};

exports.post = function(req, res, next) {
  var username = req.body.regname;
  var password = req.body.regpass;
  var repassword = req.body.reregpass;
  if (username && password && repassword) {
    User.register(username, password, repassword, function(err, user) {
        if (err) {
          console.log(err);
          if (err instanceof AuthError) {
            return next(new HttpError(403, err.message));
          } else {
            return next(err);
          }
        }

        req.session.user = user._id;
        res.send({});

      });
  }else{
    return next(new HttpError(403, 'заполните поля!'));
  }
};