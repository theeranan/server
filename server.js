const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { readdirSync } = require("fs");
const cors = require("cors");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

readdirSync("./routers").map((c) => app.use("/api", require("./routers/" + c)));
app.listen(5000, () => console.log("Server is running on port 5000"));
