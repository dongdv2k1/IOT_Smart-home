
var express = require('express')  // Module xử lí chung
var mysql = require('mysql')     // Module cho phép sử dụng cơ sở dữ liệu mySQL 
var mqtt = require('mqtt')        // Module cho phép sử dụng giao thức mqtt

var app = express()
var port = 6060                   // Port của localhost do mình chọn

var exportCharts = require('./export.js') // Require file export.js

app.use(express.static("public"))
app.set("views engine", "ejs")
app.set("views", "./views")

var server = require("http").Server(app)
var io = require('socket.io')(server)

app.get('/', function (req, res) {
    res.render('home.ejs')
})

server.listen(port, function () {
    console.log('Server listening on port ' + port)
})

var client = mqtt.connect('mqtt://192.168.1.26');

// // declare topics
var topic1 = "livingroomLight";
var topic2 = "bedroomLight";
var topic3 = "airVent";


client.on("connect", function () {
    console.log("connected mqtt " + client.connected);
});

client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
});

client.subscribe("temperature-humidity");


// SQL--------Temporarily use PHPMyAdmin------------------------------
var con = mysql.createConnection({  //  tạo database
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'mcb_database'
})
// //---------------------------------------------CREATE TABLE-------------------------------------------------

con.connect(function (err) {
    if (err) throw err;
    console.log("mysql connected");
    var sql = "CREATE TABLE IF NOT EXISTS sensors11(ID int(10) not null primary key auto_increment, Time datetime not null, Temperature int(3) not null, Humidity int(3) not null, Light int(5) not null )"
    con.query(sql, function (err) {
        if (err)
            throw err;
        console.log("Table created");
    });
})

var newTemp
var newHumi
var newLight


// //--------------------------------------------------------------------
var cnt_check = 0;
client.on('message', function (topic, message) {
    console.log("topic:" + topic.toString());       // kiểu dạng của dữ liệu
    console.log("message is " + message);
    // console.log("topic is " + topic)
    const objData = JSON.parse(message);
    if (topic == "temperature-humidity") {
        cnt_check = cnt_check + 1;
        newTemp = objData.Temperature;
        newHumi = objData.Humidity;
        newLight = objData.Light;
    }

    if (cnt_check == 1) {
        console.log("ready to save");
        var n = new Date();
        var month = n.getMonth() + 1;
        var Date_and_Time = n.getFullYear() + "-" + month + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
        var sql = "INSERT INTO sensors11 (Time, Temperature, Humidity, Light) VALUES ('" + Date_and_Time.toString() + "', '" + newTemp + "', '" + newHumi + "', '" + newLight + "')"
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table inserted");
            console.log(Date_and_Time + " " + newTemp + " " + newHumi + " " + newLight);
        });
        exportCharts(con, io);
        cnt_check = 0;
    }
})
// //----Socket---------Control devices----------------------------

io.on('connection', function (socket) {
    console.log("socket " + socket.id + " connected")
    socket.on('disconnect', function () {
        console.log(socket.id + " disconnected")
    })

    socket.on("livingroomLightChange", function (data) {
        if (data == "on") {
            console.log('Livingroom light ON')
            client.publish(topic1, 'On');
        }
        else {
            console.log('Livingroom light OFF')
            client.publish(topic1, 'Off');
        }
    })


    socket.on("bedroomLightChange", function (data) {
        if (data == "on") {
            console.log('Bedroom light ON')
            client.publish(topic2, 'bedroomLightOn');
        }
        else {
            console.log('Bedroom light OFF')
            client.publish(topic2, 'bedroomLightOFF');
        }
    })

    socket.on("airVentChange", function (data) {
        if (data == "on") {
            console.log('Air vent ON')
            client.publish(topic3, 'airVentOn');
        }
        else {
            console.log('Air vent OFF')
            client.publish(topic3, 'airVentOff');
        }
    })
})




// dữ liệu từ cảm biến gửi về qua arduino đưa lên mqtt 