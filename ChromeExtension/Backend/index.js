const express = require("express");
const bodyParser = require("body-parser");
const analyticsRouter = require("./routes/analytics");

const app = express();
app.use(bodyParser.json());
app.use("/analytics", analyticsRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
