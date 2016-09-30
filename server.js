var config = require('./config.json'),
	http = require("http"),
	fs = require("fs"),
	port = config.port || 8888;

new http.Server(function(req, res) {
	if (req.url == "/mp3.html") {
		var file = new fs.ReadStream("crash.mp3");
		sendFile(file, res);
	}
}).listen(parseInt(port, 10));

console.log("Server is running on port: " + port + ", Ctrl+C to stop");

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