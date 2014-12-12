var mysqlpool = require('./dbConnection/mysqlQuery');
var globals = require('./globals');

exports.sponsorIndex = function(req, res) {
	
		res.render('sponsorIndex', {title : 'Sponsors/FlyUS', header : 'Sponsor'});
	
};

exports.sponsorLogin = function(req,res){
	var id = req.param("user_id");
	var pass = req.param("user_pass");
	var query="select sid,name,email,password from ad_4a077c919828cb2.sponsors where email='" + id + "' and password='" + pass + "'";
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log("Res : " + resultStr[0]);
				globals.auth_spon = 'true';
				globals.user = resultStr[0].name;
				globals.sponsor_id = resultStr[0].sid;
				res.render('sponsorHome', {title : 'Sponser Home', header : 'Sponsor DashBoard'});
				//res.render('studentListForSponsor',{results : result});
			} else {
				console.log("Invalid form");
				res.end('Invalid login');
			}
		}
	});
};

exports.sponsorRegister = function(req, res) {
	var details = [];
	details[0] = req.param('SponsorName');
	details[1] = req.param('sponsorType');
	details[2] = req.param('studentType');
	details[3] = 95112;
	details[4] = req.param('email');
	details[5] = req.param('password');
	details[6] = req.param('stype');
	details[7] = req.param('SSN');
	details[8] = req.param('criteria');

	var query = "insert into sponsors (name,type,studentType,zip,email,password,stype,ssn,criteria)"
			+ "values('" + details[0] + "','" + details[1] + "','" + details[2] + "',"
			+ details[3] + ",'" + details[4] + "','"+ details[5] + "','"
			+ details[6] + "','" + details[7] + "','" + details[8] + "');"

	console.log(query);
	var query1="select sid,name,email,password from ad_4a077c919828cb2.sponsors where email='" + details[4] + "'";

	mysqlpool.execQuery(query, "", function(err, results) {
		if (err) {
			throw err;
		} else {
			
			mysqlpool.execQuery(query1, "", function(err, results) {
				if (err) {
					throw err;
				} else {
					var resultStr = JSON.parse(JSON.stringify(results));
					console.log("Res : " + resultStr[0]);
					globals.auth_spon = 'true';
					globals.user = resultStr[0].name;
					globals.sponsor_id = resultStr[0].sid;
					res.render('sponsorHome', {title : 'Sponser Home', header : 'Sponsor DashBoard'});
				}
			});
		}
	});
};

exports.sponsorHome = function(req,res){
	if(globals.auth_spon == "true"){
		res.render('sponsorHome', {title : 'Sponser Home', header : 'Sponsor DashBoard'});
	} else {
		res.render('studentIndex',{ title : 'Student Login', header : 'Student'});
	}
};

exports.getListOfStudents = function(req, res) {
	if(globals.auth_spon == "true"){
		var sponsorId = globals.sponsor_id;

		var studentId = [];

		var userName = "team16";
		var password = "team16";
		
		var query="select student_details.studentId,student_details.name,student_details.school,student_details.course," +
				  "student_details.fee,student_details.email,student_details.resume,student_details.justification,sponsor_student.comment,sponsor_student.status from student_details,sponsor_student " +
				  "where student_details.studentId=sponsor_student.studentId and sponsor_student.sponsorId="+sponsorId;
		
		console.log(query);
		
		mysqlpool.execQuery(query, "", function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length > 0) {
					var resultStr = JSON.parse(JSON.stringify(results));
					console.log(resultStr);
					studentId = resultStr;
					res.render('studentListForSponsor', {
						results : resultStr,
						//studentDetails : studentId
					});
				}else{
					
					res.render('studentListForSponsor', {
						results : null,
						//studentDetails : studentId
					});
				}
			}
		});
	} else {
		res.render('studentIndex',{ title : 'Student Login', header : 'Student'});
	}
};

exports.otherSponsors = function(req,res){
	console.log("hi");
};

exports.viewFullProfile = function(req, res) {
	//var MongoClient = require('mongodb').MongoClient;
	var resultsGet = req.param('results');
	
	var sid = parseInt(req.query.sid);
	console.log(sid);
	//var studentResult=req.param('studentId');
	//var studentId=sid.split("_");
	
	//var finalStudentId=studentId[1];
	
	var query="select student_details.studentId,student_details.country,student_details.name,student_details.school,student_details.course," +
	  "student_details.fee,student_details.email,student_details.resume,student_details.justification,sponsor_student.comment,sponsor_student.status from student_details,sponsor_student " +
	  "where student_details.studentId=sponsor_student.studentId and sponsor_student.studentId="+sid+" and sponsor_student.sponsorId="+globals.sponsor_id;

	console.log(query);
	
	mysqlpool.execQuery(query, "", function(err, results) {
	if (err) {
		throw err;
	} else {
		if (results.length > 0) {
			var resultStr = JSON.parse(JSON.stringify(results));
			console.log(resultStr);
			studentId = resultStr;
			res.render('viewFullProfile', {
				results : resultStr[0],
				//studentDetails : studentId
			});
		}
	}
});
	

	
};

exports.storeProfileEvaluation = function(req,res){
	var comment=req.param('comment');
	var status=req.param('status');
	var studentId=req.param('studentId');
	var sponsorId=globals.sponsor_id;
	var query="update sponsor_student set comment='"+comment+"',status='"+status+"' where studentId="+studentId+" and sponsorId="+sponsorId;
	
	mysqlpool.execQuery(query, "", function(err, results) {
		if (err) {
			throw err;
		} else {
			res.redirect('/getListOfStudents');
		}
	});
};

exports.logout = function(req,res){
	globals.auth_spon = "false";
	globals.student_id = "";
	globals.user = "";
	
	res.render('studentIndex',{ title : 'Student Login', header : 'Student'});
};