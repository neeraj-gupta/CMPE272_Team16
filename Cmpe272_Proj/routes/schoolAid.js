var mysqlpool=require('./dbConnection/mysqlQuery');

exports.profile = function(req,res){
	console.log("in the method");
	res.render('schoolAid');
};

exports.getSchoolAidDetails = function(req,res){
	console.log("In School Aid Details");
	var state = req.param("state");
	//var id = req.query.id;
	var query="select school,annualCost,noOfIntlStudents,noAwardedAid,averageAward from ad_4a077c919828cb2.schools_with_aid where state= '" +state+"'";
	console.log(query);
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log("REs : " + resultStr);
				res.render('schoolAidResult', { title : 'School Information for Financial Aid', result : resultStr});
			} else {
				console.log("Invalid form");
				res.render('schoolAid');
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
				res.render('schoolAid', { title : 'University List', result : resultStr, error : ''});
			} else {
				console.log("Invalid form");
				res.render('gradSchool', { title : 'University List', result : '', error : 'No Result Found'});
			}
		}
	});
};