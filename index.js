const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const moment = require('moment')

const routers = require("./routes");
const db = require("./models");
const dbConfig = require("./config/db.config");
require('./config');

// Express Application
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "3000mb" }));
app.use(bodyParser.urlencoded({ limit: "3000mb", extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
routers(app);

// Create Server
const server = http.createServer(app);
//DB connection
db.sequelize.sync()
	.then(() => {
		console.log(`\nDB connected   : ${dbConfig.DB}`)
		server.listen(process.env.APP_PORT, () => {
			console.log(`Server on port : ${process.env.APP_PORT} \n`)
		})
	})
	.catch((err) => {
		console.log("\nFailed to connect db: " + err.message,"\n")
	});
