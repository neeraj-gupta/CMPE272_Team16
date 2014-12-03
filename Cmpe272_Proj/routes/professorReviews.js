/**
 * New node file
 */
exports.professorReviews = function(req, res) {

	res.render('professorReviews');

}

exports.getProfessorReviews = function(req, res) {
	var universityName = req.param('universityName');
	var departmentName = req.param('departmentName');
	var univArray = universityName.split(" ");
	
	if(departmentName!==null || !departmentName.length<1){
		
		var deptArray=departmentName.split(" ");
		var departmentUrl=""
			
			for (var i = 0; i < deptArray.length; i++) {

				if (i < deptArray.length - 1) {
					departmentUrl = departmentUrl + deptArray[i] + "+";
					console.log(departmentUrl);
				} else {

					departmentUrl = departmentUrl + deptArray[i];
					console.log(departmentUrl);

				}

			}
			
	}
    
	var universityUrl = ""
		

	for (var i = 0; i < univArray.length; i++) {

		if (i < univArray.length - 1) {
			universityUrl = universityUrl + univArray[i] + "+";
			console.log(universityUrl);
		} else {

			universityUrl = universityUrl + univArray[i];
			console.log(universityUrl);

		}

	}

	var Client = require('node-rest-client').Client;
	var client = new Client();

	var url = "http://www.ratemyprofessors.com/find/professor/?department="+departmentUrl+"&institution="+universityUrl+"&page=1&query=*%3A*&queryoption=TEACHER&queryBy=schoolDetails&sid="

	console.log(url);
	client.get(url, function(data, response) {

		// console.log(data);
		var prof = [];
		prof = data.professors;
		// console.log(prof);
		prof.forEach(function(professor) {
			console.log(professor.tFname);
		});
		// console.log(data[0]);
		// console.log(data[0].tLname);
		res.render('viewProfessorReviews', {
			professorResults : prof
		});

	});

}