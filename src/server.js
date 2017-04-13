import express  from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import bosyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import * as error from './error';
import errorHandler from 'errorhandler';

import config from './etc/';

import * as db from './utils/DataBaseUtils.js';

import * as mongoose from './libs/mongoose.js';

mongoose.setUpConnection();

const HttpError = error.HttpError;

const app = express();

app.disabled('x-powered-by');

app.set('views', path.join(__dirname, '../views'));

app.set('view engine', 'jade');
if (app.get('env') == 'development') {
	app.use(logger('dev'));
	app.use(function(req, res, next){
		console.log('%s %s', req.method, req.url);
		next();
	});
}else{
  	app.use(logger('default'));
}

app.use(cookieParser());

import sessionStore from './libs/sessionStore';

app.use(session({
	secret: config.get('session:secret'), // ABCDE242342342314123421.SHA256
	key: config.get('session:key'),
	cookie: config.get('session:cookie'),
	store: sessionStore
}));

app.use(require('./middleware/sendHttpError'));

app.use(require('./middleware/loadUser'));

app.use(require('./middleware/getPages'));

app.use(express.static(path.join(__dirname, '../public')));

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
	if (typeof err == 'number') { // next(404);
		err = new HttpError(err);
	}
	if (err instanceof HttpError) {
		// res.render("error", {error: 'error'});
		res.sendHttpError(err);
	} else {
		if (app.get('env') == 'development') {
			errorHandler(err, req, res, next);
		} else {
			err = new HttpError(500);
			res.sendHttpError(err);
		}
	}
});

app.use(bosyParser.json({limit: '50mb'}));
app.use(bosyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({ origin: '*' }));

require('./routes/')(app, db);

const server = app.listen(config.get('servePort'), () => {
  console.log(`Server is app and running on port ${config.get("servePort")} `);
});

var io = require('./socket')(server);
app.set('io', io);