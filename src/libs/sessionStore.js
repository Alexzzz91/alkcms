var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session')
var MongoStore = require('connect-mongo/es5')(session);

var mongoose_store = new MongoStore({mongooseConnection: mongoose.connection});

var sessionStore = mongoose_store;

module.exports = sessionStore;
