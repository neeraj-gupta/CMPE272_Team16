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
				globals.auth = 'true';
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
	details[3] = req.param('zip');
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

	mysqlpool.execQuery(query, "", function(err, results) {
		if (err) {
			throw err;
		} else {
			res.render('sponsorHome', {title : 'Sponser Home', header : 'Sponsor DashBoard'});
			//res.render('studentListForSponsor');
		}
	});
};


exports.getListOfStudents = function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var sponsorId = globals.sponsor_id;

	var studentId = [];

	var userName = "team16";
	var password = "team16";
	
	var query = "select studentId,status from sponsor_student where sponsorId=" + sponsorId;

	mysqlpool.execQuery(query, "", function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log(resultStr);
				studentId = resultStr;
			}
		}
	});

	MongoClient.connect("mongodb://" + userName + ":" + password + "@ds061370.mongolab.com:61370/cmpe272", function(err, db) {
		if (!err) {
			console.log("We are connected");
			var collection = db.collection('studentDetails');
			var inner = "[";
			var outer = "]";
			var ids = "";
			var values = [];
			for (var i = 0; i < studentId.length; i++) {

				if (i < studentId.length - 1) {
					ids = ids + studentId[i].studentId + ",";
				} else {
					ids = ids + studentId[i].studentId;
				}
				values.push(studentId[i].studentId);
			}
			var innerQuery = inner + ids + outer;
			var queryFormongo = "{'sid':{'$in':" + innerQuery + "}}"
			collection.find({
				sid : {
					$in : values
				}
			}).toArray(function(err, docs) { 
				var data = docs;
				console.log(data);
				
				data.forEach(function(studentresults){
					var id=studentresults.sid;
					var status;
					
					for(var i=0;i<studentId.length;i++){
						if(id == studentId[i].studentId){
							status = studentId[i].status;
							studentresults.status = status;
						}
					}
				});
				
				console.log(docs);
				res.render('studentListForSponsor', {
					results : data,
					studentDetails : studentId
				});
			});
		} else {
			console.log(err);
		}
	});
};

exports.otherSponsors = function(req,res){
	console.log("hi");
};

exports.viewFullProfile = function(req, res) {
	var MongoClient = require('mongodb').MongoClient;
	var resultsGet = req.param('results');
	var sid = parseInt(req.param('sid'));
	var studentResult=req.param('studentId');

	var userName = "team16";
	var password = "team16";

	MongoClient.connect("mongodb://" + userName + ":" + password
			+ "@ds061370.mongolab.com:61370/cmpe272", function(err, db) {
		var collection = db.collection('studentDetails');
		if (!err) {
			collection.find({
				sid : sid
			}).toArray(function(err, docs) {
				var data = docs;
				console.log(data[0].schoolDetails);
				res.render('viewFullProfile', {
					results : data[0],
					students : data[0].schoolDetails
				});
			});
		} else {
			console.log(err);
		}
	});

	/*
	 * resultsGet.forEach(function(result){
	 * 
	 * if(result.sid===sid){
	 * 
	 * 
	 * studentResult=result;
	 * res.render('viewFullProfile',{results:studentResult}); }
	 *  })
	 */
};

exports.storeProfileEvaluation = function(req,res){
	var comment=req.param('comment');
	var status=req.param('status');
	var studentId=req.param('studentId');
	var sponsorId=31;
	var query="update sponsor_student set comment='"+comment+"',status='"+status+"' where studentId="+studentId+" and sponsorId="+sponsorId;
	
	mysqlpool.execQuery(query, "", function(err, results) {
		if (err) {
			throw err;
		} else {
			res.redirect('/getMyStudentDetails');
		}
	});
};

exports.logout = function(req,res){
	globals.auth = "false";
	globals.student_id = "";
	globals.user = "";
	
	res.render('studentIndex',{ title : 'Student Login', header : 'Student'});
};