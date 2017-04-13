import checkAuth from '../middleware/checkAuth';

module.exports = function(app, db, pages) {
	
	// app.get('/', (req, res) => {
	// 	res.send('Hello world');
	// });

	app.get('/', require('./frontpage').get);
    
    app.get('/login', require('./login').get);
    
    app.post('/login', require('./login').post);
	
	app.post('/register', require('./register').post);

	app.post('/logout', require('./logout').post);

	app.get('/page', checkAuth, require('./page').get);

	app.get('/na_cepi', checkAuth, (req, res) =>{
		db.getInfo().then(data => res.render('na_cepi', {data:data[0]}))
	});
	
	app.post('/na_cepi/set-info', checkAuth, (req, res) =>{
		db.createInfo(req.body).then(data => res.send(data));
	});

	app.post('/na_cepi/set-info/:id', checkAuth, (req, res) =>{
		db.updateInfo(req.body).then(data => res.send(data));
	});

	app.get('/na_cepi/info', (req, res) => {
		//res.send('Hello world');
		db.getInfo().then(data => res.send(data));
	});

	app.get('/na_cepi/:page?', checkAuth, (req, res) =>{
		switch(req.params.page){
			case 'rewiews-view':
				db.getRewievs().then(data => res.render('rewiews', {data:data}));
				break;
			case 'stock-view':
				db.getStock().then(data => res.render('stock', {data:data}));	
				break;
			case 'questies-view':
				db.getQuesties().then(function(data){console.log(data)});
				db.getQuesties().then(data => res.render('questies', {data:data}));
				break;
			case 'reservs-view':
				db.getReserv().then(data => res.render('reservs', {data:data}));
				break;
			default:
				res.render('404');
				break;
		}
	});

	app.get('/na_cepi/reqiews', (req, res) =>{
		db.getRewievs().then(data => res.send(data));
	});

	app.post('/na_cepi/reqiews', checkAuth, (req, res) =>{
		db.createReqiew(req.body).then(data => res.send(data));
	});

	// app.get('/na_cepi/reqiews/:id', (req, res) =>{
	// 	db.listReqiews().then(data => res.send(data));
	// });

	app.get('/na_cepi/questies', (req, res) => {
		db.getQuesties().then(data => res.send(data));
	});

	app.post('/na_cepi/questies', checkAuth, (req, res) =>{
		db.createQuesties(req.body).then(data => res.send(data));
	});

	app.post('/na_cepi/questies/:id', checkAuth, (req, res) =>{
		db.updateQuesties(req.body).then(data => res.send(data));
	});
	
	app.get('/na_cepi/reserv', (req, res) =>{
		db.getReserv().then(data => res.send(data));
	});

	app.post('/na_cepi/reserv', checkAuth, (req, res) =>{
		db.createReserv(req.body).then(data => res.send(data));
	});

	app.get('/na_cepi/stock', (req, res) =>{
		db.getStock().then(data => res.send(data));
	});

	app.post('/na_cepi/stock', checkAuth, (req, res) =>{
		db.createStock(req.body).then(data => res.send(data));
	});

	app.get('/get-pages', (req, res) =>{
		db.getPages().then(data => res.send(data));
	});

	app.post('/create-page', checkAuth, (req, res) =>{
		db.createPage(req.body).then(data => res.send(data));
	});

	//другие страницы которую будут идти из бд

	app.get('/:page?', function(req, res){
		req.getpage = res.locals.getpage = page;
		
		var page = req.params.page, data;
		if (!page) page = 'home'; 
		data = store[page];
		if (!data) {

			res.render('404');
		}
		data.query = req.query;

		res.render('dynamicPage', data);
	})

};