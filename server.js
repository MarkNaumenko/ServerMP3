var http = require("http");
var fs = require("fs");

new http.Server(function(req, res) {
	if (req.url == "/mp3.html") {
		var file = new fs.ReadStream("crash.mp3");
		sendFile(file, res);
	}
}).listen(8888);

console.log("Server is running on port: 8888, Ctrl+C to stop");

function sendFile(file, res) {
	file.pipe(res);
	file.on("error", function(err) {
		res.statusCode = 500;
		res.end("Server Error");
		console.error(err);
	});
	res.on("close", function() {
		file.destroy();
	});
}