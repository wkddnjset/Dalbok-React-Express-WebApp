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
	
	var data = {
		"Message":"",
		"Status" : "",
		"Data" : ""
	};
	pool.query(queryStr, function(err, rows) {
		console.log(rows.length)
		if(err){
			data["Message"] = err.toString();
			data["Status"] = "Error";
			data["Data"] = null;
			res.json(data);
		}else{
			if(rows[0].length == 0){
				data["Message"] = "데이터가 존재하지 않습니다.";
				data["Status"] = "Error";
				data["Data"] = null;
				res.json(data);
			}
			else{
				data["Message"] = "파싱에 성공했습니다.";
				data["Status"] = "Success";
				data["Data"] = [
					{'Restaurant':rows[0]},
					{'Restaurant_Category':rows[1]},
					{'Review':rows[2]}
				];
				res.json(data);
			}
		}
	});
});

// 회원가입! 
router.post('/signup', function(req, res){

	// promise 선언
	var promise_signup = new Promise(function (resolve, reject) {
		req.on('data',function(data){
			if(data.toString() == undefined || data.toString()=='' || data.toString() == null)
				reject(new Error("Cannot find any data from Client"));
			else
				resolve(data.toString());
		});
	});
	// promise 실행
	promise_signup.then(function (resData) {

		resData = JSON.parse(resData);
		console.log("email : "+resData.email);
		console.log("password : "+resData.password);
		console.log("username : "+resData.username);
		console.log("age : "+resData.age);
		console.log("sex : "+resData.sex);

		var data = {
			"Message":"",
			"Status" : "",
		};

		// 유저 테이블에 데이터 추가 하는 쿼리스트링
		var queryStr = "INSERT INTO ";
		queryStr += "user( ";
		queryStr += "email, ";
		queryStr += "password, ";
		queryStr += "username, ";
		queryStr += "age, ";
		queryStr += "sex) ";
		queryStr += "VALUES( ";
		queryStr += "'"+resData.email+"', ";
		queryStr += "'"+resData.password+"', ";
		queryStr += "'"+resData.username+"', ";
		queryStr += ""+resData.age+", ";
		queryStr += "'"+resData.sex+"') ";

		pool.query(queryStr, function(err, rows) {
			console.log(rows);
			if(err){
				// 아이디 중복에 대한 에러 메세지
				if(err.toString().includes("'username_UNIQUE'")){
					data["Message"] = "이미 존재하는 아이디 입니다.";
				}
				// 이메일 중복에 대한 에러 메세지
				else if(err.toString().includes("'email_UNIQUE'")){
					data["Message"] = "이미 가입된 이메일 입니다.";
				}
				// 빈 칸에 대한 에러
				else if(err.toString().includes("cannot be null")){
					data["Message"] = "빈 칸을 전부 채워주세요.";
				}
				// 그외 에러 메세지
				else{
					data["Message"] = err.toString();
				}
				data["Status"] = "Error";
				res.json(data);
			}else{
				data["Message"] = rows.toString();
				data["Status"] = "Success";
				res.json(data);
			}
		});

	}, function (error) {
		console.error("error : "+error);
	});
});

// 로그인! 
router.post('/signin', function(req, res, next){

	//Promise 선언
	var promise_signin = new Promise(function (resolve, reject) {
		req.on('data',function(data){
			if(data.toString() == undefined || data.toString()=='' || data.toString == null)
				reject(new Error("Cannot find any data from Client"));
			else
				resolve(data.toString());
				// resolve(JSON.parse(data.toString()));
			});
	});

	// Promise 실행
	promise_signin.then(function (resData) {

		resData = JSON.parse(resData);
		console.log("ID : "+resData.id);
		console.log("PW : "+resData.password);

		var data = {
			"Message":"",
			"Status" : "",
		};

		// id 값이 유저의 이메일 혹은 아이디와 같은 경우 로그인 가능!
		var queryStr = "SELECT ";
		queryStr += "* ";
		queryStr += "FROM user ";
		queryStr += "WHERE ";
		queryStr += "(email ='"+resData.id+"' ";
		queryStr += "AND ";
		queryStr += "password ='"+resData.password+"') ";
		queryStr += "OR ";
		queryStr += "(username ='"+resData.id+"' ";
		queryStr += "AND ";
		queryStr += "password ='"+resData.password+"') ;";

		console.log(queryStr);
		pool.query(queryStr, function(err, rows) {
			console.log(rows);
			if(rows.length == 0){
				data["Message"] = "아이디 혹은 패스워드가 일치하지 않습니다.";
				data["Status"] = "Error";
				res.json(data);
			}
			// 빈 칸에 대한 에러
			else if(err.toString().includes("cannot be null")){
				data["Message"] = "빈 칸을 전부 채워주세요.";
			}
			else{
				data["Message"] = rows[0].username+"님 환영 합니다!";
				data["Status"] = "Success";
				res.json(data);
			}
		});

	}, function (error) {
		console.error("error : "+error);
	});
	
});

// 댓글 작성! 
router.post('/review', function(req, res){

	// promise 선언
	var promise_review = new Promise(function (resolve, reject) {
		req.on('data',function(data){
			if(data.toString() == undefined || data.toString()=='' || data.toString() == null)
				reject(new Error("Error"));
			else
				resolve(data.toString());
		});
	});
	// promise 실행
	promise_review.then(function (resData) {

		resData = JSON.parse(resData);
		console.log("restaurant_id : "+resData.restaurant_id);
		console.log("user_id : "+resData.user_id);
		console.log("content : "+resData.content);
		console.log("star : "+resData.star);

		var data = {
			"Message":"",
			"Status" : "",
		};

		// 유저 테이블에 데이터 추가 하는 쿼리스트링
		var queryStr = "INSERT INTO ";
		queryStr += "review(";
		queryStr += "restaurant_id, ";
		queryStr += "user_id, ";
		queryStr += "content, ";
		queryStr += "star) ";
		queryStr += "VALUES(";
		queryStr += resData.restaurant_id+", ";
		queryStr += resData.user_id+", ";
		queryStr += "'"+resData.content+"', ";
		queryStr += ""+resData.star+") ";

		console.log(queryStr);
		pool.query(queryStr, function(err, rows) {
			console.log(rows);
			if(err){
				// 댓글 중복에 대한 에러
				if(err.toString().includes("'unique_index'")){
					data["Message"] = "이미 댓글이 등록된 음식점입니다.";
				}
				// 빈 칸에 대한 에러
				else if(err.toString().includes("cannot be null")){
					data["Message"] = "빈 칸을 전부 채워주세요.";
				}
				// 그외 에러 메세지
				else{
					data["Message"] = err.toString();
				}
				data["Status"] = "Error";
				res.json(data);
			}else{
				data["Message"] = "댓글이 등록되었습니다.";
				data["Status"] = "Success";
				res.json(data);
			}
		});
	}, function (error) {
		console.error("error : "+error);
	});
});

module.exports = router;