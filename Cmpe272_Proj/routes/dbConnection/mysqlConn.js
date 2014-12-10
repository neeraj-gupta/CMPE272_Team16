
var mysql_pool = require('mysql');
var pool  = mysql_pool.createPool({
	host     : 'us-cdbr-iron-east-01.cleardb.net',
	user     : 'bf153966fd6efd',
	password : '82359d29',
	port     : '3306',
	database : 'ad_4a077c919828cb2',
	connectionLimit : '10'
});

exports.pool = pool;
