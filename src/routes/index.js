import checkAuth from '../middleware/checkAuth';

module.exports = function(app, db, pages) {
	app.use(function(req, res, next){
		if(req.url.search( /^\/na_cepi/i )){
			require('./na_cepi')(app, db, checkAuth);
		};
		next();
	});

	app.get('/', require('./frontpage').get);
    
    app.get('/login', require('./login').get);
    
    app.post('/login', require('./login').post);
	
	app.post('/register', require('./register').post);

	app.post('/logout', require('./logout').post);

	app.get('/page', checkAuth, require('./page').get);

	app.get('/get-pages', (req, res) =>{
		db.getPages().then(data => res.send(data));
	});

	app.post('/create-page', checkAuth, (req, res) =>{
		db.createPage(req.body).then(data => res.send(data));
	});

	//другие страницы которую будут идти из бд

	// app.get('/:page?', function(req, res){
	// 	req.getpage = res.locals.getpage = page;
		
	// 	var page = req.params.page, data;
	// 	if (!page) page = 'home'; 
	// 	data = store[page];
	// 	if (!data) {

	// 		res.render('404');
	// 	}
	// 	data.query = req.query;

	// 	res.render('dynamicPage', data);
	// })

};