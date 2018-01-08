// rename to index.js
module.exports = {
	"auth": {
	  "clientSecret": process.env.clientSecret,
 		"callbackURL": process.env.callbackURL,
 		"clientID": process.env.clientID
 	},
  "db": {
  	"url": process.env.MongoURI,
  } 
}