module.exports = function(app, db, checkAuth) {
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
		db.getInfo().then(data => res.send(data));
	});


	app.get('/na_cepi/reqiews', (req, res) =>{
		db.getRewievs().then(data => res.send(data));
	});

	app.post('/na_cepi/reqiews', checkAuth, (req, res) =>{
		db.createReqiew(req.body).then(data => res.send(data));
	});

	app.get('/na_cepi/reqiews/:id', (req, res) =>{
		db.listReqiews().then(data => res.send(data));
	});

	app.get('/na_cepi/questies', (req, res) => {
		db.getQuesties().then(data => res.send(data));
	});

	app.post('/na_cepi/questies', checkAuth, (req, res) =>{
		db.createQuesties(req.body).then(data => res.send(data));
	});

	app.post('/na_cepi/questies/:id', checkAuth, (req, res) =>{
		db.updateQuesties(req.body).then(data => res.send(data));
	});

	app.delete('/na_cepi/questies/:id', checkAuth, (req, res) =>{
		db.deleteQuesties(req.params.id).then(data => res.send(data));
	});

	app.get('/na_cepi/reserv', (req, res) =>{
		db.getReserv().then(data => res.send(data));
	});

	app.post('/na_cepi/reserv', (req, res) =>{
		console.log('aaa');
		console.log(req.body);
		db.createReserv(req.body).then(data => res.send(data));
	});

	app.get('/na_cepi/stock', (req, res) =>{
		db.getStock().then(data => res.send(data));
	});

	app.post('/na_cepi/stock', checkAuth, (req, res) =>{
		db.createStock(req.body).then(data => res.send(data));
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
}