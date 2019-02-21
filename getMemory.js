var csrf    = require('./get-csrf-token.js');

Window.webchatMethods = {
	getMemory: function () {
		return csrf.getToken()
		.then( function(token_data){
			return {
				"memory": {
					"cookie": token_data.cookie,
					"token": token_data.token
				},
				"merge": true
			};
		}
	}
}