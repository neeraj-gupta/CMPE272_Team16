var express = require('express')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path')
  , profileForm = require('./routes/porfileForm')
  , professorReviewForm = require('./routes/professorReviews');

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
app.get('/gradSchool', index.gradschool);
app.get('/professorReviews', index.profreview);
app.get('/immigration', index.immigration);

app.get('/gradSchoolFinder',profileForm.profile);
app.post('/getList',profileForm.getListOfUniversities);
app.get('/professorReviews',professorReviewForm.professorReviews);
app.post('/getProfessorReviews',professorReviewForm.getProfessorReviews);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
