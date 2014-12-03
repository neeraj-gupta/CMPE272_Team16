/**
 * New node file
 */
var mysqlpool=require('./dbConnection/mysqlQuery');

exports.immigrationDocInfo=function(req,res){
	
	var query="select * from ad_4a077c919828cb2.visa_stat where Countries= 'India'";
	
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log(resultStr);
				var resultArray=[];
				
				/*if(parseInt(resultStr[0].FY2013.replace(",",""))>1000){
					resultStr[0].FY2013=parseInt(resultStr[0].FY2013.replace(",",""))/100;
				}
				
				if(parseInt(resultStr[0].FY2012.replace(",",""))>1000){
					resultStr[0].FY2012=parseInt(resultStr[0].FY2012.replace(",",""))/100;
				}
				
				if(parseInt(resultStr[0].FY2011.replace(",",""))>1000){
					resultStr[0].FY2011=parseInt(resultStr[0].FY2011.replace(",",""))/100;
				}
				
				if(parseInt(resultStr[0].FY2010.replace(",",""))>1000){
					resultStr[0].FY2010=parseInt(resultStr[0].FY2010.replace(",",""))/100;
				}
				if(parseInt(resultStr[0].FY2009.replace(",",""))>1000){
					resultStr[0].FY2009=parseInt(resultStr[0].FY2009.replace(",",""))/100;
				}*/
				
				
				resultArray.push("FY2013"+","+parseInt(resultStr[0].FY2013.replace(",","")));
				resultArray.push("FY2012"+","+parseInt(resultStr[0].FY2012.replace(",","")));
				resultArray.push("FY2011"+","+parseInt(resultStr[0].FY2011.replace(",","")));
				resultArray.push("FY2010"+","+parseInt(resultStr[0].FY2010.replace(",","")));
				resultArray.push("FY2009"+","+parseInt(resultStr[0].FY2009.replace(",","")));
	
				console.log("in javascript");
				console.log(resultArray);
				
					//res.render('universityResult', { title : 'LogIn/eBay', results : resultStr});
				res.render('visaStatistics',{results:resultArray});
				
				
				
				
				
			} else {
				console.log("Invalid form");
				res.render('ProfileForm');
			}
		}
	});
	
	

	

};