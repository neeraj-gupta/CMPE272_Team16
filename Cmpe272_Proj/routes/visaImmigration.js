var globals = require('./globals');
var mysqlpool = require('./dbConnection/mysqlQuery');

exports.visaStatsInd = function(req,res){	
	console.log("In Page Render");
	res.render('visaStatistics', {title : 'Visa Stats', header : 'Visa Statistics'});
};

exports.visaStats = function(req,res){	
	var country = req.query.country;
	var query="select * from ad_4a077c919828cb2.visa_stat where Countries='" + country +"'";
	
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				console.log(resultStr);
				var resultArray=[];
				
				resultArray.push("FY2013"+","+parseInt(resultStr[0].FY2013.replace(",","")));
				resultArray.push("FY2012"+","+parseInt(resultStr[0].FY2012.replace(",","")));
				resultArray.push("FY2011"+","+parseInt(resultStr[0].FY2011.replace(",","")));
				resultArray.push("FY2010"+","+parseInt(resultStr[0].FY2010.replace(",","")));
				resultArray.push("FY2009"+","+parseInt(resultStr[0].FY2009.replace(",","")));
				
				var strOp = '';
				strOp += '<table>';
	        	strOp += '	<tr>';
	        	strOp += '		<th>Year</th>';
	        	strOp += '		<th>Visa Issued</th>';
	        	strOp += '	</tr>';
	        	
        		for(var i = 0;i < resultArray.length; i++){
        			var op = resultArray[i].split(",");
					strOp += '<tr>';
					strOp += '	<td>';
					strOp += '		' + op[0];
					strOp += '	</td>';
					strOp += '	<td>';
					strOp += '		' + op[1];
					strOp += '	</td>';
					strOp += '</tr>';
				}
				strOp += '</table>';

				console.log(strOp);
				
				res.send(strOp);
			} else {
				console.log("Invalid form");
				res.send("");
			}
		}
	});
};