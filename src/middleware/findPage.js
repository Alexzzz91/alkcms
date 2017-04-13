var Pages = require('../models/pages').Pages;
var fs = require('fs');

module.exports = function(req, res, next) {

	req.page = res.locals.page = 'slug1';

	Pages.find({'pageSlug': req.page}, function(err, page) {

	if (err) return next(err);

	req.page = res.locals.page = page;

	next();

	});

};