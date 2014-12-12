var globals = require('./globals');
var mysqlpool = require('./dbConnection/mysqlQuery');

exports.index = function(req, res){
	res.render('index', { title: 'Home'});
};

exports.search = function(req,res){
	var str = req.query.name;
	var query="select uname,preface,location,infrastructure,weather,courses,faculty,fees,financialaid,placements,crowd,famous,verdict,website from ad_4a077c919828cb2.university_details where uname like %" + str;
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log("REs : " + resultStr[0]);
				res.render('universityResult', { title : 'University Details', result : resultStr[0]});
			} else {
				console.log("Invalid form");
				res.render('ProfileForm');
			}
		}
	});
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

exports.immigrationDetail = function(req, res){
	console.log('Immigration Detail Page');
	res.render('immigrationDetail', { title: 'Immigartion', header : "Immigration"});
};

exports.ds160faqs = function(req, res){
	console.log('DS-160 Faqs');
	res.render('ds160faqs', { title: 'DS-160 FAQs', header : "DS-160 FAQs"});
};

exports.viQuestions = function(req, res){
	console.log('Sample Visa Interview Questions');
	res.render('viQuestions', { title: 'Sample Visa Interview Questions', header : "Sample Visa Interview Questions"});
};

exports.scholarship = function(req,res){
	console.log('Sample Visa Interview Questions');
	res.render('scholarshipHome', { title: 'Scholarships', header : "Scholarships"});
};