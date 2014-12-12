var mysqlpool=require('./dbConnection/mysqlQuery');

exports.profile = function(req,res){
	console.log("in the method");
	res.render('schoolAid');
};

exports.getOrgAidDetails = function(req,res){
	console.log("In Org Aid Details");
	var query="select Organinzation_Name,Information,Where_to_find_the_application,Telephone,Fax from ad_4a077c919828cb2.orgdetails";
	console.log(query);
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log("REs : " + resultStr);
				res.render('orgAid', { title : 'Organization information for school aid', result : resultStr});
			} else {
				console.log("Invalid form");
				res.render('orgAid');
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
				res.render('orgAid', { title : 'University List', result : resultStr, error : ''});
			} else {
				console.log("Invalid form");
				res.render('gradSchool', { title : 'University List', result : '', error : 'No Result Found'});
			}
		}
	});
};