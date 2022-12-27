const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//function
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//middleware  and static files
app.use(express.static("public"));
//000000000000000000000000000000000000000
app.post("/", function (req, res) {
  const query = req.body.cityname;
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=9a53a9485296f4275e78e4618069c0ca";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const wData = JSON.parse(data);
      const desc = wData.weather[0].description;
      const temp = wData.main.temp;
      res.write(
        "<h1>The temperature of the " +
          req.body.cityname +
          " is: " +
          temp +
          " degree celsius</h1>"
      );

      res.write("<h2>The weather is having " + desc + " condtion.</h2>");
      var icon = wData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + imageUrl + ">");
    });
  });
});
app.listen(8080, function () {
  console.log("app is listening on port :3");
});
