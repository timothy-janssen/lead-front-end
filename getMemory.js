var csrf    = require('./get-csrf-token.js');

Window.webchatMethods = {
	getMemory: function () {


		return Window.csrf_token || csrf.getToken()
		.then( function(token_data){
			return {
				"memory": {
					"cookie": token_data.cookie,
					"token": token_data.token
				},
				"merge": true
			};
		})
	}
}

document.onload = function () {

	Window.csrf_token = csrf.getToken()
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