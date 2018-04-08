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

// 음식점 리스트 데이터 --> 첫 화면에 뿌려줄 데이터
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

// 음식점 상세 페이지 데이터
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

// 회원가입! 
router.post('/signup', function(req, res){

	// ID에 해당하는 음식점
	req.on('data',function(data){
		console.log(JSON.parse(data.toString()));
	});
	var queryStr = "SELECT ";
	queryStr += "* ";
	queryStr += "FROM restaurant ";
	queryStr += "WHERE ";
	queryStr += "id ="+req.params.id+" ;";
	// 해당 음식점에 카테고리

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

var queryString = require('querystring');

// 로그인! 
router.post('/signin', function(req, res, next){

	//Promise 선언
	var promise_ = new Promise(function (resolve, reject) {
		req.on('data',function(data){
			if(data.toString() == undefined || data.toString()=='' || data.toString == null)
				reject(new Error("Cannot find any data from Client"));
			else
				resolve(data.toString());
				// resolve(JSON.parse(data.toString()));
			});
	});

	// Promise 실행
	promise_.then(function (resData) {

		resData = JSON.parse(resData);
		console.log("ID : "+resData.email);
		console.log("PW : "+resData.password);

		var data = {
			"Message":"",
			"Status" : "",
		};

		var queryStr = "SELECT ";
		queryStr += "* ";
		queryStr += "FROM user ";
		queryStr += "WHERE ";
		queryStr += "email ='"+resData.email+"' ";
		queryStr += "AND ";
		queryStr += "password ='"+resData.password+"' ;";
		console.log(queryStr);

		pool.query(queryStr, function(err, rows) {
			console.log(rows);
			if(rows.length == 0){
				data["Message"] = "아이디 혹은 패스워드가 일치하지 않습니다.";
				data["Status"] = "Error";
				res.json(data);
			}else{
				data["Message"] = rows[0].username+"님 환영 합니다!";
				data["Status"] = "Success";
				res.json(data);
			}
		});

	}, function (error) {
		console.error("error : "+error);
	});
	
});

module.exports = router;