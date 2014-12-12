var globals = require('./globals');
var mysqlpool=require('./dbConnection/mysqlQuery');

exports.showUniv=function(req,res){
	var uName = req.param('universityName');
	
	var query="select id,uname,preface,location,infrastructure,weather,courses,faculty,fees,financialaid,placements,crowd,famous,verdict,website from ad_4a077c919828cb2.university_details where uname like '"+uName+"'";
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				res.render('universityDetails', { title : 'LogIn/eBay', results : resultStr});
			} else {
				console.log("Invalid form");
				res.render('ProfileForm');
			}
		}
	});	
};