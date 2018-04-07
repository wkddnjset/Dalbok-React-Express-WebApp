var express = require('express');
var router = express.Router();

///////////////
var request = require('request');
var mysql = require('mysql');
var pool = require('../references/databaseConfig.js');

router.get('/examples', function(req,res,next){
	const examples = [
		{id: 0, text:"React.js", img:"images/React.png"},
		{id: 1, text:"Express.js", img:"images/Express.png"},
		{id: 2, text:"MaterialUI", img:"images/MaterialUI.png"},
	];
	res.json(examples);
});

router.get('/restaurant', function(req, res){
	var queryStr = "SELECT ";
		queryStr += "id, ";
		queryStr += "name, ";
		queryStr += "open, ";
		queryStr += "close, ";
		queryStr += "FROM ";
		queryStr += "restaurant ";

  pool.query(queryStr, function(err, rows) {
    if(err) throw err;

    console.log('The solution is: ', rows);
    res.send(rows[0]);
    res.end();
  });
});
module.exports = router;