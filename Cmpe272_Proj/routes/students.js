var globals = require('./globals');
var mysqlpool=require('./dbConnection/mysqlQuery');
var fs = require('fs-extra');
var busboy = require('connect-busboy'); 

exports.studentIndex = function(req,res){
	if(globals.auth == "true"){
		res.render('studentHome', { title : 'Student Home', header : 'Student DashBoard'});
	} else {
		res.render('studentIndex',{title:'User/FlyUS', header : 'User'});
	}
};

exports.studentLogin = function(req,res){
	var id = req.param("user_id");
	var pass = req.param("user_pass");
	var query="select studentId,name,email,password from ad_4a077c919828cb2.student_details where email='" + id + "' and password='" + pass + "'";
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log("Res : " + resultStr);
				console.log("Res : " + resultStr[0].studentId);
				globals.auth = 'true';
				globals.user = resultStr[0].name;
				globals.student_id = resultStr[0].studentId;
				res.render('studentHome', { title : 'Student Home', header : 'Student DashBoard'});
			} else {
				console.log("Invalid form");
				res.end('Invalid login');
			}
		}
	});
};

exports.studentRegister = function(req,res){
	console.log("In Student Info Details");
	var studentId=1;
	var maxId;
	var state = req.param("state");
	var studentName = req.param("studentName");
	var country = req.param("country");
	var school = req.param("school");
	var course = req.param("course");
	var fee = req.param("tutionfees");
	var email = req.param("email");
	var resume = req.param("resume");
	var justification = req.param("justification");
	var password = req.param("password");
	//var id = req.query.id;
	
	 var fstream;
	 var resumePath;
	 var justificationPath;
	// console.log(req.files);
	 
	 
	 fs.readFile(req.files.resume.path, function (err, data) {
	   	  // ...
	   	  resumePath = __dirname + "/uploads/resume/"+email+".pdf";
	   	  console.log(resumePath);
	   	  fs.writeFile(resumePath, data, function (err) {
	   		  console.log(err);
	   	   // res.redirect("createMyProfile");
	   		fs.readFile(req.files.justification.path, function (err, data) {
			   	  // ...
			   	  justificationPath = __dirname + "/uploads/justification/"+email+".pdf";
			   	  console.log(justificationPath);
			   	  fs.writeFile(justificationPath, data, function (err) {
			   		  console.log(err);
			   	   // res.redirect("createMyProfile");
			   		  
			   		  resumePath="/uploads/resume/"+email+".pdf";
			   		  justificationPath="/uploads/justification/"+email+".pdf";
			   		var query = "insert into ad_4a077c919828cb2.student_details values ('','"+studentName +"','"+country +"','"+school +"','"+course +"','"+fee +"','"+email +"','"+resumePath +"','"+justificationPath +"','"+password +"','"+state +"')";
				   	//	var query="select school,annualCost,noOfIntlStudents,noAwardedAid,averageAward from ad_4a077c919828cb2.schools_with_aid where state= '" +state+"'";
				   		console.log(query);
				   		mysqlpool.execQuery(query,"",function(err,results){
				   			if(err){
				   				throw err;
				   			} else {
				   				if(results.length > 0){
				   					var resultStr = JSON.parse(JSON.stringify(results));
				   					console.log("REs : " + resultStr);
				   					res.render('studentHome', { title : 'School Information for Financial Aid'});
				   				} else {
				   					console.log("Invalid form");
				   					res.render('studentHome',{ title : 'School Information for Financial Aid'});
				   				}
				   			}
				   		});
			   		  
			   		  
			   	  });
			   	})
	   		  
	   		  
	   	  });
	   	})
	 
	 
	
};

exports.studentHome = function(req,res){
	if(globals.auth == "true"){
		res.render('studentHome', { title : 'Student Home', header : 'Student DashBoard'});
	} else {
		res.render('studentIndex',{title:'Student/FlyUS', header : 'Student'});
	}
}

exports.getSponsorsList = function(req, res) {
	var sponsorsIndividual = [];

	if(globals.auth == "true"){
		var studentId =  globals.student_id;
		var query2 = "select sponsorId from ad_4a077c919828cb2.sponsor_student where studentId=" + studentId;
		var query = "";

		mysqlpool.execQuery(query2, "", function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length > 0) {
					var resultStr = JSON.parse(JSON.stringify(results));				
					for(var i=0;i<resultStr.length;i++){
						sponsorsIndividual.push(resultStr[i].sponsorId);
					}
					
					var valuesIn = "";
					var query = "select sid,name,type,studentType,email,stype,criteria from ad_4a077c919828cb2.sponsors where sid NOT In "

					for (var i = 0; i < sponsorsIndividual.length; i++) {
						if (i < sponsorsIndividual.length - 1) {
							valuesIn = valuesIn + sponsorsIndividual[i] + ",";
						} else {
							valuesIn = valuesIn + sponsorsIndividual[i];
						}
					}

					query = query + "(" + valuesIn + ")";
					console.log(query);
					mysqlpool.execQuery(query, "", function(err, results) {
						if (err) {
							throw err;
						} else {
							if (results.length > 0) {
								var resultStr = JSON.parse(JSON.stringify(results));
								console.log(resultStr);
				
								res.render('connectToSponsor', {
									title : 'SponsorList/FlyUS',
									header : 'Sponsors List',
									results : resultStr
								});
							} else {
								console.log("Invalid Login");
								res.render('studentIndex',{title:'Student/FlyUS', header : 'Student'});
							}
						}
					});
				} else {
					mysqlpool.execQuery("select name,type,studentType,email,stype,ssn,criteria ,sid from ad_4a077c919828cb2.sponsors","", function(err, results) {
						if (err) {
							throw err;
						} else {
							if (results.length > 0) {
								var resultStr = JSON.parse(JSON.stringify(results));
								console.log(resultStr);
								res.render('connectToSponsor', {
									title : 'SponsorList/FlyUS',
									results : resultStr
								});
							} else {
								console.log("Invalid form");
								res.render('studentIndex',{title:'Student/FlyUS', header : 'Student'});
							}
						}
					});	
				}
			}
		});
	} else {
		console.log("Student Not Logged In");
		res.render('studentIndex',{ title : 'Student Login', header : 'Student'});
	}
};


exports.notifySponsor = function(req, res) {
	if(globals.auth == "true"){
		var sponsorId = req.param('sponsorList');

		var studentId = globals.student_id;
		var success = 0;
		var left = 0;

		var values1;
		

		var valueString = "";
		var valStringsArray = [];

		var typeId=typeof sponsorId;
		if(typeId=="object"){
			var query = "insert into sponsor_student (sponsorId,studentId,status) values ";
		for (var i = 0; i < sponsorId.length; i++) {
			valStringsArray.push("(" + parseInt(sponsorId[i]) + "," + studentId + ",'Submitted')");
		}

		for (var j = 0; j < valStringsArray.length; j++) {
			if (j < valStringsArray.length - 1) {
				valueString = valueString + valStringsArray[j] + ","
			} else {
				valueString = valueString + valStringsArray[j];
			}
		}

		console.log(valueString);
		query = query + valueString;
		console.log(query);
		}else{
			
			var query = "insert into sponsor_student (sponsorId,studentId,status) values ("+parseInt(sponsorId)+","+studentId+",'Submitted')";
		}

		mysqlpool.execQuery(query, "", function(err, results) {
			if (err) {
				throw err;
			} else {
				var name = [];
				var valuesIn = "";
				var query = "select name from sponsors where sid IN ";

				for (var i = 0; i < sponsorId.length; i++) {
					if (i < sponsorId.length - 1) {
						valuesIn = valuesIn + sponsorId[i] + ",";
					} else {
						valuesIn = valuesIn + sponsorId[i];
					}
				}

				query = query + "(" + valuesIn + ")";
				console.log(query);

				mysqlpool.execQuery(query, "", function(err, results) {
					if (err) {
						throw err;
					} else {
						if (results.length > 0) {
							var resultStr = JSON.parse(JSON.stringify(results));
							name.push(resultStr[0]);
							console.log(name);
							res.render('connectionSuccess', {
								header : 'Link to Sponsor',
								results : resultStr
							});
						} else {
							console.log("Invalid form");
							// res.render('ProfileForm');
						}
					}
				});
			}
		});

		if (success === 1) {
			var name = [];
			var valuesIn = "";
			var query = "select name from sponsor_student where sponsorId IN "

			for(var i = 0; i < sponsorId.length; i++){
				if (i < sponsorId.length - 1) {
					valuesIn = valuesIn + sponsorId[i] + ",";
				} else {
					valuesIn = valuesIn + sponsorId[i];
				}
			}

			query = query + "(" + valuesIn + ")";
			console.log(query);

			mysqlpool.execQuery(query, "", function(err, results) {
				if (err) {
					throw err;
				} else {
					if (results.length > 0) {
						var resultStr = JSON.parse(JSON.stringify(results));
						name.push(resultStr[0]);
						console.log(name);
						res.render('connectionSuccess', {
							results : resultStr
						});
					} else {
						console.log("Invalid form");
						// res.render('ProfileForm');
					}
				}
			});
		}
	} else {
		console.log("Student Not Logged In");
		res.render('studentIndex',{ title : 'Student Login', header : 'Student'});
	}
};


exports.myApplicationDetails = function(req,res){
	if(globals.auth == "true"){
		console.log('ID : '+globals.student_id);
		var studentId = globals.student_id;
		var sponsorsIndividual = [];
		
		var queryJoin="select sponsors.name,sponsors.type,sponsors.email,sponsor_student.status,sponsor_student.comment from sponsor_student,sponsors " +
				       "where sponsor_student.sponsorId=sponsors.sid and sponsor_student.studentId= "+studentId;
		
		var applicationApplied = false;
		
		mysqlpool.execQuery(queryJoin, "", function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length > 0) {
					applicationApplied = true;
					var resultStr = JSON.parse(JSON.stringify(results));

					console.log(resultStr);
					res.render('MySponsorApplications', {
						title : 'View Status',
						header : 'Application Status',
						results : resultStr ,
						applicationEmpty : applicationApplied ,
						message:""
					});
				} else {
					var message="You have not applied to any sponsors";
					res.render('MySponsorApplications', {
						title : 'View Status',
						header : 'Application Status',
						applicationEmpty : applicationApplied ,
						message : message
					});
				}
			}
		});
	} else {
		console.log("Student Not Logged In");
		res.render('studentIndex',{ title : 'Student Login', header : 'Student'});
	}
};

exports.logout = function(req,res){
	globals.auth = "false";
	globals.student_id = "";
	globals.user = "";
	
	res.render('studentIndex',{ title : 'Student Login', header : 'Student'});
};