var express = require('express')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path')
  , uDetails=require('./routes/uDetails')
  , profileForm = require('./routes/porfileForm')
  , professorReviewForm = require('./routes/professorReviews')
  , visaImmigration=require('./routes/visaImmigration')
  , sponsorShip=require('./routes/sponsorShip')
  , students=require('./routes/students');

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
0
app.get('/gradSchool', uDetails.getUniversityList);
app.get('/universityDetails',uDetails.getUniversityDetails);
app.get('/gradSchoolFinder',profileForm.profile);
app.post('/getList',profileForm.getListOfUniversities);
app.get('/professorReviews',professorReviewForm.professorReviews);
app.post('/getProfessorReviews',professorReviewForm.getProfessorReviews);
app.get('/getMoreProfessorReview',professorReviewForm.getMoreProfessorReview);
app.get('/registerSponsor',sponsorShip.sponsorRegistration);
app.post('/sponsorRegistration',sponsorShip.register);
app.get('/createMyProfile',students.createProfile);


// Visa Stats
app.get('/visaStatsInd',visaImmigration.visaStatsInd);
app.post('/visaStats',visaImmigration.visaStats);

app.post('/search', index.search);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
