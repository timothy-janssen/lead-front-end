//var request = require('request-promise');

const getToken = () => {
    return d3.request("https://radiant-sea-97792.herokuapp.com/" + "http://my341721.crm.ondemand.com/sap/c4c/odata/v1/c4codataapi/")
    	.mimeType("application/json")
    	.mode('cors')
    	.header("X-CSRF-Token",   "Fetch")
    	.header("Authorization",  "Basic YWRtaW5pc3RyYXRpb24wMTpXZWxjb21lNQ==")
    	.header("Content-Type",   "application/json")
    	.header("x-access-control-allow-credentials", "true")
 //   	.response(function(xhr) { return JSON.parse(xhr.responseText); })
    	.get( function (error, token_data) { 

    		console.log(token_data);
    		var csrf_token = token_data.getResponseHeader('x-csrf-token');
    		var cookie = token_data.getResponseHeader('set-cookie');
    			Window.csrf_token = { 	
    		    	"memory": {
						"cookie": cookie,
						"token": csrf_token	
					},
					"merge": true
				};
				document.getElementById("token-div").innerHTML = Window.csrf_token.memory.token + " "  + Window.csrf_token.memory.cookie;
				return Window.csrf_token;
			});
}	

window.webchatMethods = {
	getMemory: (conversationId) => {
		return Window.csrf_token || getToken();
	}
}
