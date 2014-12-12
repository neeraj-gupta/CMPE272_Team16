var globals = require('./globals');

exports.professorReviews = function(req, res) {
	res.render('professorReviews');
}

exports.getProfessorReviews = function(req, res) {
	var universityName = req.param('universityName');
	var departmentName = req.param('departmentName');
	var univArray = universityName.split(" ");
	var pageNumber = req.param('pageNumber');

	if (departmentName !== null || !departmentName.length < 1) {

		var deptArray = departmentName.split(" ");
		var departmentUrl = "";

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

	var universityUrl = "";

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

	var url = "http://www.ratemyprofessors.com/find/professor/?department="
			+ departmentUrl + "&institution=" + universityUrl + "&page="
			+ pageNumber
			+ "&query=*%3A*&queryoption=TEACHER&queryBy=schoolDetails&sid="

	console.log(url);
	client
			.get(
					url,
					function(data, response) {
						// console.log(data);
						var prof = [];
						prof = data.professors;
						console.log(prof);
						var remaining = data.remaining
						var nextFlag = false;
						if (remaining > 0) {
							nextFlag = true;

						}
						/*
						 * prof.forEach(function(professor) {
						 * console.log(professor.tFname); });
						 */
						console
								.log("************************************************************")
						console.log("Page number is " + pageNumber);
						console
								.log("************************************************************")
						res.render('resultDisplay', {
							title : 'Professor',
							results : prof,
							nextFlag : nextFlag,
							pageNumber : pageNumber,
							department : departmentUrl,
							school : universityUrl
						});
					});

}

exports.getMoreProfessorReview = function(req, res) {
	var departmentName = req.query.department;
	var universityName = req.query.institution;
	var pageNumber = parseInt(req.query.page);
	var univArray = universityName.split(" ");
	if (departmentName !== null || !departmentName.length < 1) {
		var deptArray = departmentName.split(" ");
		var departmentUrl = "";
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

	var url = "http://www.ratemyprofessors.com/find/professor/?department="
			+ departmentUrl + "&institution=" + universityUrl + "&page="
			+ pageNumber
			+ "&query=*%3A*&queryoption=TEACHER&queryBy=schoolDetails&sid="
	console.log(url);
	
	client.get(url, function(data, response) {
		var prof = [];
		prof = data.professors;
		var remaining = data.remaining
		var nextFlag = false;
		if (remaining > 0) {
			nextFlag = true;

		}
		res.render('moreprofessorReviews', {
			title : 'Professor',
			results : prof,
			nextFlag : nextFlag,
			pageNumber : pageNumber,
		});
	});
}
