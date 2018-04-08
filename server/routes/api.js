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
	queryStr += "summary, ";
	queryStr += "lat, ";
	queryStr += "lon ";
	queryStr += "FROM ";
	queryStr += "restaurant ";

	pool.query(queryStr, function(err, rows) {
		if(err) throw err;

		console.log(rows);
		res.send(rows);
		res.end();
	});
});

router.get('/restaurant/:id', function(req, res){

	// ID에 해당하는 음식점
	var queryStr = "SELECT ";
	queryStr += "* ";
	queryStr += "FROM restaurant ";
	queryStr += "WHERE ";
	queryStr += "id ="+req.params.id+" ;";
	// 해당 음식점에 카테고리
	queryStr += "SELECT ";
	queryStr += "c.name ";
	queryStr += "FROM restaurant_category AS rc  ";
	queryStr += "LEFT JOIN category AS c ";
	queryStr += "ON ";
	queryStr += "(rc.category_id=c.id) ";
	queryStr += "WHERE ";
	queryStr += "rc.restaurant_id="+req.params.id+" ;";
	// 해당 음식점에 리뷰
	queryStr += "SELECT ";
	queryStr += "* ";
	queryStr += "FROM review ";
	queryStr += "WHERE ";
	queryStr += "restaurant_id="+req.params.id+" ";
	

	pool.query(queryStr, function(err, rows) {
		if(err) throw err;
		console.log(rows);
		var JsonData = [
			{'Restaurant':rows[0]},
			{'Restaurant_Category':rows[1]},
			{'Review':rows[2]}
		]
		res.send(JsonData);
		res.end();
	});
});

module.exports = router;