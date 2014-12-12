var globals = require('./globals');
var mysqlpool=require('./dbConnection/mysqlQuery');

exports.profile=function(req,res){
	console.log("in the method");
	res.render('ProfileForm');
};

exports.getListOfUniversities = function(req,res){
	
	var profileForm = [];
	var total = 0;
	var grade;
	profileForm.push(req.param('gre_verbal_score'));
	console.log(typeof req.param('gre_verbal_score'));
	profileForm.push(req.param('gre_quant_score'));
	profileForm.push(req.param('toefl_score'));
	profileForm.push(req.param('gpa'));
	profileForm.push(req.param('experience'));
	profileForm.push(req.param('papers'));
	
	var verbal = getVerbalScore(profileForm[0]);
	var quant = getQuantScore(profileForm[1]);
	var toefl = getToeflScore(profileForm[2]);
	var gpa = getGPAScore(profileForm[3]);
	var experience = getExperienceScore(profileForm[4]);
	var paper = getPaperScore(profileForm[5]);
	
	total = verbal + quant + toefl + gpa + experience + paper;
	
	if(total>194){
		grade="A+";
	}
	if(total>=174 && total<194){
		grade="A";
	}
	
	if(total>=155 && total<174){
		grade="A-";
	}
	if(total>=143 && total<155){
		grade="B+";
	}
	if(total>=134 && total<143){
		grade="B";
	}
	if(total>=121 && total<13){
		grade="B-";
	}
	if(total>=94 && total<121){
		grade="C";
	}
	if(total<94){
		grade="D";
	}
	
	var query = "select University_Name,Website from ad_4a077c919828cb2.cmpe_univ_grades where Grade= '"+grade+"'";
	mysqlpool.execQuery(query,"",function(err,results){
		if(err){
			throw err;
		} else {
			
			console.log(results);
			
			if(results.length > 0){
				var resultStr = JSON.parse(JSON.stringify(results));
				res.render('resultDisplay', { title : 'University', results : resultStr});
			} else {
				console.log("Invalid form");
				res.end();
			}
		}
	});
};

function getVerbalScore(verbal){
	var verbalScore=parseInt(verbal);	
	console.log(typeof verbalScore);
	if(verbalScore>=169){
		return 49.5;
	}
	if(verbalScore>=167){
		return 49;
	}
	if(verbalScore===166){
		return 48.5;
	}
	if(verbalScore===165){
		return 48;
	}
	if(verbalScore===164){
		return 47;
	}
	if(verbalScore===163){
		return 46.5;
	}
	if(verbalScore===162){
		return 45;
	}
	if(verbalScore===161){
		return 44.5;
	}
	if(verbalScore===160){
		return 43;
	}
	if(verbalScore===159){
		return 42;
	}
	if(verbalScore===158){
		return 39.5;
	}
	if(verbalScore===157){
		return 38.5;
	}
	if(verbalScore===156){
		return 38;
	}
	if(verbalScore===155){
		return 34.5;
	}
	if(verbalScore===154){
		return 32;
	}
	if(verbalScore===153){
		return 31;
	}
	if(verbalScore===152){
		return 28;
	}
	if(verbalScore===151){
		return 25.5;
	}
	if(verbalScore===150){
		return 24;
	}
	if(verbalScore===149){
		return 21;
	}
	if(verbalScore===148){
		return 20;
	}
	if(verbalScore===147){
		return 18;
	}
	if(verbalScore===146){
		return 15.5;
	}
	if(verbalScore===145){
		return 14;
	}
	if(verbalScore===144){
		return 13;
	}
	if(verbalScore===143){
		return 10.5;
	}
	if(verbalScore===142){
		return 9;
	}
	if(verbalScore===141){
		return 8;
	}
	if(verbalScore===140){
		return 6.5;
	}
	if(verbalScore===139){
		return 5;
	}
	if(verbalScore===138){
		return 4;
	}
	if(verbalScore===137){
		return 3;
	}
	if(verbalScore===136){
		return 3;
	}
	if(verbalScore===135){
		return 2;
	}
	if(verbalScore<135){
		return 1;
	}
}

function getQuantScore(quant){
	var quantScore=parseInt(quant);
	if(quantScore>=170){
		return 50;
	}
	if(quantScore===169){
		return 49.5;
	}
	if(quantScore>=167){
		return 48;
	}
	if(quantScore===166){
		return 47;
	}
	if(quantScore===165){
		return 46;
	}
	if(quantScore===164){
		return 43;
	}
	if(quantScore===163){
		return 42;
	}
	if(quantScore===162){
		return 41;
	}
	if(quantScore===161){
		return 41;
	}
	if(quantScore===160){
		return 41;
	}
	if(quantScore===159){
		return 39;
	}
	if(quantScore===158){
		return 38.5;
	}
	if(quantScore===157){
		return 38.5;
	}
	if(quantScore===156){
		return 38;
	}
	if(quantScore===155){
		return 34.5;
	}
	if(quantScore===154){
		return 32;
	}
	if(quantScore===153){
		return 31;
	}
	if(quantScore===152){
		return 28;
	}
	if(quantScore===151){
		return 25.5;
	}
	if(quantScore===150){
		return 24;
	}
	if(quantScore===149){
		return 21;
	}
	if(quantScore===148){
		return 20;
	}
	if(quantScore===147){
		return 18;
	}
	if(quantScore===146){
		return 15.5;
	}
	if(quantScore===145){
		return 14;
	}
	if(quantScore===144){
		return 13;
	}
	if(quantScore===143){
		return 10.5;
	}
	if(quantScore===142){
		return 9;
	}
	if(quantScore===141){
		return 8;
	}
	if(quantScore===140){
		return 6.5;
	}
	if(quantScore===139){
		return 5;
	}
	if(quantScore===138){
		return 4;
	}
	if(quantScore===137){
		return 3;
	}
	if(quantScore===136){
		return 3;
	}
	if(quantScore===135){
		return 2;
	}
	if(quantScore<135){
		return 1;
	}
}

function getToeflScore(toefl){
	var toeflScore=parseInt(toefl)
	if(toeflScore>=110){
		return 20;
	}
	if(toeflScore>100 && toeflScore<110){
		return 18;
	}
	if(toeflScore>90 && toeflScore<100){
		return 16;
	}
	if(toeflScore>80 && toeflScore<90){
		return 14;
	}
	if(toeflScore>70 && toeflScore<80){
		return 12;
	}
	if(toeflScore>60 && toeflScore<70){
		return 11;
	}
	if(toeflScore<60){
		return 10;
	}
	
}

function getGPAScore(gpaScore){
	var gpa=parseInt(gpaScore);
	if(gpa>=3.9){
		return 70;
	}
	if(gpa>=3.8){
		return 65;
	}
	if(gpa>=3.6){
		return 60;
	}
	if(gpa>=3.5){
		return 55;
	}
	if(gpa>=3.3){
		return 50;
	}
	if(gpa>=3.0){
		return 40;
	}
	if(gpa<3.0){
		return 20;
	}
}

function getExperienceScore(exp){
	
	var experience=parseInt(exp);
	if(experience >=5){
		return 5;
	}
	if(experience>=3 && experience <5){
		return 4;
	}
	if(experience >=1 && experience <3){
		return 3;
	}
	if(experience <1){
		return 0;
	}
}

function getPaperScore(publications){
	var papers=parseInt(publications);
	if(papers>=5){
		return 5;
	}
	if(papers<5 && papers >=3){
		return 4;
	}
	if(papers <3 && papers >=1){
		return 2;
	}
	if(papers<=0){
		return 0;
	}
}