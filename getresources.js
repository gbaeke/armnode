var adal=require('adal-node');
var Client=require('node-rest-client').Client;
var rest=require('restler');


var AuthenticationContext= adal.AuthenticationContext;

var tenantID="TenantID";
var clientID="ClientID";
var resource="https://management.azure.com/";
var authURL="https://login.windows.net/" + tenantID;
var secret="ClientSecret";

var context=new AuthenticationContext(authURL);
var authHeader, requestURL;


context.acquireTokenWithClientCredentials(resource, clientID, secret, function(err,tokenResponse) {
	if (err) {
		console.log('Oops, error' + err.stack);
	}	else {
		// console.log(tokenResponse);
		authHeader = tokenResponse['accessToken'];
		
		requestURL="https://management.azure.com/subscriptions/subid/resources?api-version=2015-01-01";
		rest.get(requestURL, {accessToken:authHeader}).on('complete',function(result) {
		console.log(result);
		});
	}});
