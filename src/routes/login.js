import mongoose from 'mongoose';
import async from 'async';

import * as userModel from '../models/User';

import * as error from '../error';

const User = mongoose.model("User");

const AuthError = userModel.AuthError;

const HttpError = error.HttpError;

export function get(req, res){
  res.render('login');
}

export function post(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  User.authorize(username, password, function(err, user) {
    if (err) {
      if (err instanceof AuthError) {
        return next(new HttpError(403, err.message));
      } else {
        return next(err);
      }
    }

    req.session.user = user._id;
    if(user.username == 'na_cepi'){
      res.send('/na_cepi');
    }else{
      res.send('/');
    }
  });
}
