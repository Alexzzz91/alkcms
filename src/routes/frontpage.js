exports.get = function(req, res) {
	if(req.user == null){
		//var number = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
		var number = 4;
		res.render('frontpage'+number);
	}else{
		res.render('dashboard');
	}
  	
};