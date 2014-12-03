
exports.index = function(req, res){
	res.render('index', { title: 'Home'});
};

exports.gradschool = function(req, res){
	console.log('Grad School Landing Page');
	res.render('gradSchool', { title: 'Graduate School', result : "", error : ""});
};

exports.profiler = function(req, res){
	console.log('GS Profiler Landing Page');
	res.render('profiler', { title: 'GS Profiler', header : ""});
};

exports.profreview = function(req, res){
	console.log('Professor Review Landing Page');
	res.render('profReview', { title: 'Professor Reviews', header : ""});
};

exports.immigration = function(req, res){
	console.log('Immigration Page');
	res.render('immigration', { title: 'Immigartion', header : "Immigration"});
};