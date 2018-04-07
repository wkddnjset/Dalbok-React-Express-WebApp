const express = require('express');

const request = require('request'),
	  cheerio = require('cheerio'),
	  fs = require('fs');

const app = express();

var apis = require('./server/routes/api');

app.use('/', apis);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));