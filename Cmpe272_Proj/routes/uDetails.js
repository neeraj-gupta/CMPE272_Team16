var mysqlpool=require('./dbConnection/mysqlQuery');
var globals = require('./globals');

exports.profile = function(req,res){
	console.log("in the method");
	res.render('universityDetails');
};

exports.getUniversityDetails = function(req,res){
	console.log("In University Details");
	var id = req.query.id;
	var query="select uname,preface,location,infrastructure,weather,courses,faculty,fees,financialaid,placements,crowd,famous,verdict,website from ad_4a077c919828cb2.university_details where id=" + id;
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

exports.getUniversityList=function(req,res){
	var query="select id,uname,website from ad_4a077c919828cb2.university_details";
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				res.render('gradSchool', { title : 'University List', result : resultStr, error : ''});
			} else {
				console.log("Invalid form");
				res.render('gradSchool', { title : 'University List', result : '', error : 'No Result Found'});
			}
		}
	});
};