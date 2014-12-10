/**
 * New node file
 */

var mysqlpool=require('./dbConnection/mysqlQuery');
exports.sponsorRegistration=function(req,res){
	
	res.render('becomeSponsor');
}

exports.register=function(req,res){
	
	var details=[];
	details[0]=req.param('SponsorName');
	details[1]=req.param('sponsorType');
	details[2]=req.param('studentType');
	details[3]=req.param('zip');
	details[4]=req.param('email');
	details[5]=req.param('stype');
	details[6]=req.param('SSN');
	details[7]=req.param('criteria');
	
	var query ="insert into sponsors (name,type,studentType,zip,email,stype,ssn,criteria)" +
			   "values(' "+details[0]+" ', ' "+ details[1]+"','"+details[2]+"',"+details[3]+",'"+details[4]+"','"+details[5]+"','"+details[6]+"','"+details[7]+"');"
			   
	console.log(query);
	
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			res.render('becomeSponsor');
		}
	});
}