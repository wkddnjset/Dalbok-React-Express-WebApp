const express = require('express');

const request = require('request'),
	  cheerio = require('cheerio'),
	  fs = require('fs');

const app = express();

app.get('/api/examples', (req,res) => {
	const examples = [
		{id: 0, text:"React.js", img:"images/React.png"},
		{id: 1, text:"Express.js", img:"images/Express.png"},
		{id: 2, text:"MaterialUI", img:"images/MaterialUI.png"},
	];

	res.json(examples);
});

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));