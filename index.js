//var request = require('request-promise');

var options = {
    transformResponse: function(data) {
  		return { 'token': data.response.headers['x-csrf-token'], 
  				 'cookie': data.response.headers["set-cookie"], 
  				 'data': data.body
  		};
    }
};

const getToken = () => {
    return d3.request("https://radiant-sea-97792.herokuapp.com/" + "http://my341721.crm.ondemand.com/sap/c4c/odata/v1/c4codataapi/")
    	.mimeType("application/json")
    	.header("X-CSRF-Token",   "Fetch")
    	.header("Authorization",  "Basic YWRtaW5pc3RyYXRpb24wMTpXZWxjb21lNQ==")
    	.header("Content-Type",   "application/json")
 //   	.response(function(xhr) { return JSON.parse(xhr.responseText); })
    	.get( function (error, token_data, a, b, c) { 
    		var csrf_token = token_data.getResponseHeader('x-csrf-token');
    			Window.csrf_token = { 	
    		    	"memory": {
						"cookie": token_data.cookie,
						"token": csrf_token	
					},
					"merge": true
				};
				document.getElementById("token-div").innerHTML = Window.csrf_token.memory.token + "" 
				return Window.csrf_token;
			});
}	

window.webchatMethods = {
	getMemory: (conversationId) => {
		return Window.csrf_token || getToken();
	}
}


function getTokenAsync () {
	getToken()	;
}

