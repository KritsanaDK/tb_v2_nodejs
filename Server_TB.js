const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const app = express();
const port = 6180;

// enable files upload
app.use(
    fileUpload({
        createParentPath: true,
    })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/uploads"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.all("*", function (req, res, next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        AccessControlAllowOrigin: req.headers.origin,
        AccessControlAllowHeaders:
            "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        AccessControlAllowMethods: "POST, GET, PUT, DELETE, OPTIONS",
        AccessControlAllowCredentials: true,
    };

    /**
     * Headers
     */
    res.header(
        "Access-Control-Allow-Credentials",
        responseSettings.AccessControlAllowCredentials
    );
    res.header(
        "Access-Control-Allow-Origin",
        responseSettings.AccessControlAllowOrigin
    );
    res.header(
        "Access-Control-Allow-Headers",
        req.headers["access-control-request-headers"]
            ? req.headers["access-control-request-headers"]
            : "x-requested-with"
    );
    res.header(
        "Access-Control-Allow-Methods",
        req.headers["access-control-request-method"]
            ? req.headers["access-control-request-method"]
            : responseSettings.AccessControlAllowMethods
    );

    if ("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


const mysql = require("./con_Server_96");

app.post("/logIn", async (req, res) => {
    console.log("logIn");
    console.log(req.body)
    try {
        let user = req.body.user;
        let pass = req.body.pass;

        let data = await mysql.logIn(user, pass);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }
});

app.get("/category_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.category_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});


app.post("/category_insert", async (req, res) => {
    try {
        let token = req.body.token;
        let item = req.body.item;
        let department_key = req.body.department_key;

        let data = await mysql.category_insert(token, item, department_key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.get("/phenomenon_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.phenomenon_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.post("/phenomenon_insert", async (req, res) => {
    try {
        let token = req.body.token;
        let item = req.body.item;
        let department_key = req.body.department_key;

        let data = await mysql.phenomenon_insert(token, item, department_key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.get("/symptom_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.symptom_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.post("/symptom_insert", async (req, res) => {
    try {
        let token = req.body.token;
        let item = req.body.item;
        let department_key = req.body.department_key;

        let data = await mysql.symptom_insert(token, item, department_key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});















