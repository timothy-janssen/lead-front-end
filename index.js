//var request = require('request-promise');

var options = {
    uri:    "http://my341721.crm.ondemand.com/sap/c4c/odata/v1/c4codataapi/",
    method:  "GET",
    json:    true,
    transform2xxOnly: true,
    transform: function(body, response, resolveWithFullResponse) {
  		return {'token': response.headers['x-csrf-token'], 'cookie': response.headers["set-cookie"], 'data': body};
	},
    headers: {       
         "X-CSRF-Token":  "Fetch",
         "Authorization": "Basic YWRtaW5pc3RyYXRpb24wMTpXZWxjb21lNQ==", // base64 encoding of administration01:Welcome5
         "Content-Type":  "application/json"
    }
};

const getToken = () => {
    axios(options)
    .then( token_data => { 
    	Window.csrf_token = { 	
        	"memory": {
				"cookie": token_data.cookie,
				"token": token_data.token
			},
			"merge": true
		}; 
	})
    .catch( data => { return data; } );

    return Window.csrf_token;
}	

window.webchatMethods = {
	getMemory: (conversationId) => {
		return Window.csrf_token || getToken();
	}
}


function getTokenAsync () {

	Window.csrf_token = getToken()
						.then( function(token_data){
							return {
								"memory": {
									"cookie": token_data.cookie,
									"token": token_data.token
								},
								"merge": true
							};
						});

	document.getElementById("token-div").innerHTML = Window.csrf_token + "";
}

