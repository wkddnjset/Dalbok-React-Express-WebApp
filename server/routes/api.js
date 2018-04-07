var express = require('express');
var router = express.Router();

///////////////
var request = require('request');
var mysql = require('mysql');
var pool = require('../references/databaseConfig.js');

// router.get('api/examples', function(req,res,next){
// 	const examples = [
// 		{id: 0, text:"React.js", img:"images/React.png"},
// 		{id: 1, text:"Express.js", img:"images/Express.png"},
// 		{id: 2, text:"MaterialUI", img:"images/MaterialUI.png"},
// 	];

// 	res.json(examples);
// });

router.get('/api/examples', function(req,res,next){
	const examples = [
		{id: 0, text:"React.js", img:"images/React.png"},
		{id: 1, text:"Express.js", img:"images/Express.png"},
		{id: 2, text:"MaterialUI", img:"images/MaterialUI.png"},
	];

	res.json(examples);
});

module.exports = router;