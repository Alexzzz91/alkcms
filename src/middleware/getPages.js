import mongoose from 'mongoose';

import '../models/Pages';

const Page = mongoose.model("Page");

module.exports = function(req, res, next) {

	Page.find({}, function(err, pages) {

		if (err) return next(err);

		pages.forEach(function(page) {
		  pages[page._id] = page;
		});

		req.pages = res.locals.pages = pages;

		next();  
	});

};