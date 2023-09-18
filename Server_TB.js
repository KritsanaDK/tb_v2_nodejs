const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const app = express();
const port = 6190;

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



app.post("/kla_insert", async (req, res) => {
    try {
        let kla_code = req.body.kla_code;
        let kla_name = req.body.kla_name;
        let dep_code = req.body.dep_code;
        let emp_code = req.body.emp_code;
        let last_update = req.body.last_update;

        let data = await mysql.kla_insert(kla_code, kla_name, dep_code, emp_code, last_update);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});


app.get("/kla_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.kla_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.post("/klb_insert", async (req, res) => {
    try {
        let klb_code = req.body.klb_code;
        let klb_name = req.body.klb_name;
        let dep_code = req.body.dep_code;
        let kla_code = req.body.kla_code;
        let emp_code = req.body.emp_code;
        let last_update = req.body.last_update;

        let data = await mysql.klb_insert(klb_code, klb_name, dep_code, kla_code, emp_code, last_update);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});


app.get("/klb_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.klb_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.post("/klc_insert", async (req, res) => {
    try {
        let klc_code = req.body.klc_code;
        let klc_name = req.body.klc_name;
        let dep_code = req.body.dep_code;
        let kla_code = req.body.kla_code;
        let klb_code = req.body.klb_code;
        let emp_code = req.body.emp_code;
        let last_update = req.body.last_update;

        let data = await mysql.klc_insert(klc_code, klc_name, dep_code, kla_code, klb_code, emp_code, last_update);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.get("/klc_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.klc_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.get("/flag_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.flag_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});


app.post("/register_item_insert", async (req, res) => {
    try {
        let item_code = req.body.item_code;
        let item_name = req.body.item_name;
        let item_source = req.body.item_source;
        let dep_code = req.body.dep_code;
        let flag_code = req.body.flag_code;
        let emp_code = req.body.emp_code;
        let last_update = req.body.last_update;

        let data = await mysql.register_item_insert(item_code, item_name, item_source, dep_code, flag_code, emp_code, last_update);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});


app.get("/register_item_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.register_item_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.get("/identify_method_select", async (req, res) => {
    try {
        let data = await mysql.identify_method_select();
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.get("/complaint_record_select", async (req, res) => {
    try {

        let dep_code = req.query.dep_code;
        let kla_code = req.query.kla_code;
        let klb_code = req.query.klb_code;

        let data = await mysql.complaint_record_select(dep_code, kla_code, klb_code);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});



app.get("/result_select", async (req, res) => {
    try {
        let key = req.query.key;

        let data = await mysql.result_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});






app.post("/complaint_record_insert", async (req, res) => {
    try {
        let complaint_code = req.body.complaint_code;
        let kla_code = req.body.kla_code;
        let klb_code = req.body.klb_code;
        let klc_code = req.body.klc_code;
        let slt = req.body.slt;
        let item_code = req.body.item_code;
        let result_code = req.body.result_code;
        let dep_code = req.body.dep_code;
        let k_mode = req.body.k_mode;
        let emp_code = req.body.emp_code;
        let last_update = req.body.last_update;



        let data = await mysql.complaint_record_insert(complaint_code, kla_code, klb_code, klc_code, slt, item_code, result_code, dep_code, k_mode, emp_code, last_update);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});


const con_PRD_ASEAN_EUC = require("./con_PRD_ASEAN_EUC");
const B21 = require("./con_oracel_WH600USR");

app.get("/ins_record_select", async (req, res) => {
    try {

        let key = req.query.key;
        let mode = req.query.mode;
        let fac_code = req.query.fac_code;



        let data = [];

        if (fac_code == 'B21') {

            data = await B21.ins_record_select(key, mode, fac_code);
        }

        let tamp_data = [];

        for (let i = 0; i < data.length; i++) {
            temp = ConvertKeysToLowerCase(data[i]);

            tamp_data.push(temp);
        }

        console.log(tamp_data);




        // console.log(ConvertKeysToLowerCase(data[0]));
        await res.json(tamp_data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

function ConvertKeysToLowerCase(obj) {
    var output = {};
    for (i in obj) {
        if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
            output[i.toLowerCase()] = ConvertKeysToLowerCase(obj[i]);
        } else if (Object.prototype.toString.apply(obj[i]) === '[object Array]') {
            output[i.toLowerCase()] = [];
            output[i.toLowerCase()].push(ConvertKeysToLowerCase(obj[i][0]));
        } else {
            output[i.toLowerCase()] = obj[i];
        }
    }
    return output;
};

app.post("/complaint_record_info_insert", async (req, res) => {
    try {
        let complaint_code = req.body.complaint_code;
        let ins_no = req.body.ins_no;
        let prd_lot = req.body.prd_lot;
        let part_name = req.body.part_name;
        let serial = req.body.serial;
        let prd_date = req.body.prd_date;
        let qcs_no = req.body.qcs_no;
        let kla_code = req.body.kla_code;
        let klb_code = req.body.klb_code;
        let klc_code = req.body.klc_code;
        let k_mode = req.body.k_mode;
        let dep_code = req.body.dep_code;
        let method_id = req.body.method_id;
        let method_value = req.body.method_value;
        let emp_code = req.body.emp_code;
        let last_update = req.body.last_update;




        let data = await mysql.complaint_record_info_insert(complaint_code, ins_no, prd_lot, part_name, serial, prd_date, qcs_no, kla_code, klb_code, klc_code, k_mode, dep_code, method_id, method_value, emp_code, last_update);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});


app.get("/complaint_record_info_select", async (req, res) => {
    try {

        let key = req.query.key;

        let data = await mysql.complaint_record_info_select(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.get("/complaint_record_info_with_compaint_code", async (req, res) => {
    try {

        let dep_code = req.query.dep_code;
        let complaint_code = req.query.complaint_code;

        let data = await mysql.complaint_record_info_with_compaint_code(dep_code, complaint_code);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});



app.get("/complaint_record_select_with_comapint_code", async (req, res) => {
    try {

        let dep_code = req.query.dep_code;
        let kla_code = req.query.kla_code;
        let klb_code = req.query.klb_code;
        let complaint_code = req.query.complaint_code;

        let data = await mysql.complaint_record_select_with_comapint_code(dep_code, kla_code, klb_code, complaint_code);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});




app.get("/departments_select", async (req, res) => {
    try {

        let data = await mysql.departments_select();
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.get("/user_position_select", async (req, res) => {
    try {

        let data = await mysql.user_position_select();
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});


app.get("/user_table_select", async (req, res) => {
    try {

        let user_position = req.query.user_position;
        let department_key = req.query.department_key;

        let data = await mysql.user_table_select(user_position, department_key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});




app.post("/userinfo_insert", async (req, res) => {
    try {
        let EmpCode = req.body.EmpCode;
        let Passwords = req.body.Passwords;
        let FirstName = req.body.FirstName;
        let LastName = req.body.LastName;
        let UserPosition = req.body.UserPosition;
        let department_key = req.body.department_key;




        let data = await mysql.userinfo_insert(EmpCode, Passwords, FirstName, LastName, UserPosition, department_key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.post("/userinfo_delete", async (req, res) => {
    try {
        let key = req.body.key;

        let data = await mysql.userinfo_delete(key);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});

app.post("/userinfo_update", async (req, res) => {
    try {
        let EmpCode = req.body.EmpCode;
        let FirstName = req.body.FirstName;
        let LastName = req.body.LastName;
        let Passwords = req.body.Passwords;

        let data = await mysql.userinfo_update(EmpCode, FirstName, LastName, Passwords);
        // console.log(data);
        await res.json(data);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

});
































