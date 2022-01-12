import ScreenShotServer from "./ScreenshotServer";

const config = require("../config.json");

require('console-stamp')(console, '[HH:MM:ss.l]');

new ScreenShotServer(config.port);