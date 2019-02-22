//var request = require('request-promise');

var options = {
    url:    "http://my341721.crm.ondemand.com/sap/c4c/odata/v1/c4codataapi/",
    method:  "GET",
    crossdomain: true,
    mode: 'no-cors',
    responseType: 'json',
    transformResponse: function(data) {
  		return {'token': data.response.headers['x-csrf-token'], 'cookie': data.response.headers["set-cookie"], 'data': data.body};
	},
    headers: {       
         "X-CSRF-Token":  "Fetch",
         "Authorization": "Basic YWRtaW5pc3RyYXRpb24wMTpXZWxjb21lNQ==", // base64 encoding of administration01:Welcome5
         "Content-Type":  "application/json"
    }
};

const getToken = () => {
    return d3.get(options, function (token_data) { 
    	Window.csrf_token = { 	
        	"memory": {
				"cookie": token_data.cookie,
				"token": token_data.token
			},
			"merge": true
		}; 
		return Window.csrf_token;
	});
}	

window.webchatMethods = {
	getMemory: (conversationId) => {
		return Window.csrf_token || getToken();
	}
}


function getTokenAsync () {
	getToken().then( () => {
		document.getElementById("token-div").innerHTML = Window.csrf_token + "";
	});
}

