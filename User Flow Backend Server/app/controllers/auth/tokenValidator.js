// const express = require('express')
// const router = express.Router()
// const  CognitoExpress  = require("cognito-express");
// const { poolDataForTokenValid } = require("../../../config/UserPool");

// const cognitoExpress = new CognitoExpress(poolDataForTokenValid);

// const authenticateWithCognito = router.use(function(req, res, next) {

// 	//I'm passing in the access token in header under key accessToken
// 	let accessTokenFromClient = req.headers.accesstoken;

// 	//Fail if token not present in header.
// 	if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");

// 	cognitoExpress.validate(accessTokenFromClient, function(err, response) {

// 		//If API is not authenticated, Return 401 with error message.
// 		if (err) return res.status(401).send(err);

// 		//Else API has been authenticated. Proceed.
// 		res.locals.user = response;
// 		next();
// 	});
// });

// module.exports = { authenticateWithCognito }
