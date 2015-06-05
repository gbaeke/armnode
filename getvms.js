var adal=require('adal-node');
var rest=require('restler');


var AuthenticationContext= adal.AuthenticationContext;

var tenantID="tenantID";
var clientID="clientID";
var resource="https://management.azure.com/";
var authURL="https://login.windows.net/" + tenantID;
var secret="ClientSecret";

var context=new AuthenticationContext(authURL);
var authHeader, requestURL;

context.acquireTokenWithClientCredentials(resource, clientID, secret, function(err,tokenResponse) {
              if (err) {
                             console.log('Oops, error' + err.stack);
              }             else {
                             // console.log(tokenResponse);
                             authHeader = tokenResponse['accessToken'];
                             
                            requestURL="https://management.azure.com/subscriptions/subid/providers/Microsoft.Compute/virtualMachines?api-version=2015-05-01-preview";
        rest.get(requestURL, { accessToken: authHeader }).on('complete', function (result) {
            for (i = 0; i < result.value.length; i++) {
                console.log(result.value[i].properties["osProfile"].computerName + " " + result.value[i].properties["storageProfile"].osDisk.osType);
            }               
                             });
                             
                             
              };
                                           
});
