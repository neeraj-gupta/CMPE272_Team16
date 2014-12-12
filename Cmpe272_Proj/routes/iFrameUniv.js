/**
 * New node file
 */

var mysqlpool=require('./dbConnection/mysqlQuery');
exports.profile=function(req,res){
	
	res.render('iFrameUniv');
}

exports.getUnivList = function(req,res){
	console.log("In Univ List Details");
	
	//var id = req.query.id;
	
	
	//var query = "insert into ad_4a077c919828cb2.student_details values ('','"+studentName +"','"+country +"','"+school +"','"+course +"','"+fee +"','"+email +"','"+resume +"','"+justification +"','"+password +"','"+state +"')";
	var query="select INSTNM from ad_4a077c919828cb2.iframeuniv";
	console.log(query);
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log("REs : " + resultStr);
				res.render('iFrameUniv', { title : 'School Information for Financial Aid', result : resultStr});
			} else {
				console.log("Invalid form");
				res.render('iFrameUniv');
			}
		}
	});
};

exports.postUnivIframe = function(req,res){
	console.log("In Univ iFrame Details");
	
	var university = req.param("university");
	//var query = "insert into ad_4a077c919828cb2.student_details values ('','"+studentName +"','"+country +"','"+school +"','"+course +"','"+fee +"','"+email +"','"+resume +"','"+justification +"','"+password +"','"+state +"')";
	var query="select UNITID from ad_4a077c919828cb2.iframeuniv where INSTNM like '"+university +"'";
	console.log(query);
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log("REs : " + resultStr[0]);
				res.render('iFrameUnivResult', { title : 'School Information for Financial Aid', result : resultStr[0]});
			} else {
				console.log("Invalid form");
				res.render('iFrameUniv');
			}
		}
	});
};

