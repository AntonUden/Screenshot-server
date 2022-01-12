import * as express from "express";

export default class ScreenShotServer {
	private app;
	private http;
	private screenshot;

	constructor(port: number) {
		console.log("Starting screenshot server");

		this.screenshot = require('screenshot-desktop');

		this.app = express();
		this.app.set("port", port);

		this.app.use(require('cors')());
		this.app.use(require('helmet')())

		this.app.disable('x-powered-by');

		this.http = require("http").Server(this.app);

		this.app.get("/", async (req, res) => {
			console.log("Screenshot requested");
			this.screenshot().then((img: any) => {
				console.log("Screenshot successful");
				res.contentType('image/jpeg');
				res.send(img);
			}).catch((err: any) => {
				console.error("Failed to take screenshot");
				console.error(err);
				res.status(500);
				res.send("Server error");
			});
		});

		this.app.set("port", port);
		this.http.listen(port, function () {
			console.log("Listening on port " + port);
		});
	}
}