var express = require('express')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path')
  , uDetails=require('./routes/uDetails')
  , profileForm = require('./routes/porfileForm')
  , professorReviewForm = require('./routes/professorReviews')
  , visaImmigration = require('./routes/visaImmigration')
  , sponsorShip = require('./routes/sponsorShip')
  , request = require('request')
  , students = require('./routes/students')
  , schoolAid = require('./routes/schoolAid')
  , orgAid = require('./routes/orgAid')
  , iFrameUniv = require('./routes/iFrameUniv')
  , formidable = require('formidable')
  , path = require('path')
  , fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);
app.get('/home', index.index);
app.get('/profiler', index.profiler);
app.get('/professorReviews', index.profreview);
app.get('/immigration', index.immigration);
app.get('/immigrationDetail', index.immigrationDetail);
app.get('/viQuestions', index.viQuestions);
app.get('/ds160faqs', index.ds160faqs);
app.get('/scholarship',index.scholarship);

app.get('/gradSchool', uDetails.getUniversityList);
app.get('/universityDetails',uDetails.getUniversityDetails);
app.get('/gradSchoolFinder',profileForm.profile);
app.post('/getList',profileForm.getListOfUniversities);
app.get('/professorReviews',professorReviewForm.professorReviews);
app.post('/getProfessorReviews',professorReviewForm.getProfessorReviews);
app.get('/getMoreProfessorReview',professorReviewForm.getMoreProfessorReview);

// Sponsor Profile
app.get('/sponsor',sponsorShip.sponsorIndex);
app.post('/sponsorLogin',sponsorShip.sponsorLogin);
app.post('/sponsorRegister',sponsorShip.sponsorRegister);
app.post('/changeStatus',sponsorShip.storeProfileEvaluation);
app.get('/getListOfStudents',sponsorShip.getListOfStudents);
app.get('/otherSponsors',sponsorShip.otherSponsors);
app.post('/viewStudentFullProfile',sponsorShip.viewFullProfile);
app.get('/spon_logout',sponsorShip.logout);

//Student Profile 
app.get('/student',students.studentIndex);
app.post('/studentLogin',students.studentLogin);
app.post('/studentRegister',students.studentRegister);
app.get('/studentHome',students.studentHome);
app.get('/getSponsors',students.getSponsorsList);
app.post('/notifySponsor',students.notifySponsor);
app.get('/viewMyApplicationDetails',students.myApplicationDetails);
app.get('/stud_logout',students.logout);

// ScholarShips
app.get('/schoolAid', schoolAid.getUniversityList);
app.post('/schoolAid', schoolAid.getSchoolAidDetails);
app.get('/orgAid', orgAid.getOrgAidDetails);
app.get('/iFrameUniv',iFrameUniv.getUnivList);
app.post('/iFrameUniv',iFrameUniv.postUnivIframe);

// File download
app.get('/upload/resume/*', function(req, res){
	// var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
	console.log(req.url);
	var urlString=req.url;
	
	var urlSplit=urlString.split("/");
	console.log(urlSplit[3]);
	
	
	res.download('./upload/resume/'+urlSplit[3],urlSplit[3]); // Set disposition and send it.
});

// Visa Stats
app.get('/visaStatsInd',visaImmigration.visaStatsInd);
app.post('/visaStats',visaImmigration.visaStats);

app.post('/search', index.search);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
