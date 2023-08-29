var mysql = require("mysql");
const util = require("util");

const host_ = "163.50.57.96";
const user_ = "admin";
const pass_ = "conDB!@#$%";
const db_ = "mtl_traceback";


var pool = mysql.createPool({
    connectionLimit: 10,
    host: host_,
    user: user_,
    password: pass_,
    database: db_,
    queryTimeout: 60000, // setting timeout
});

pool.query = util.promisify(pool.query);

module.exports = {
    logIn,
    category_select,
    category_insert,
    phenomenon_select,
    phenomenon_insert,
    symptom_select,
    symptom_insert,
};


function logIn(username, password) {
    try {
        let sql = "SELECT * FROM hyper_dx_mtl.userinfo WHERE hyper_dx_mtl.userinfo.EmpCode = '" + username + "' AND hyper_dx_mtl.userinfo.Passwords = '" + password + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }
}



function category_select(key) {
    try {
        let sql = "SELECT * FROM mtl_traceback.category  where category.department_key = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function category_insert(token, item, department_key) {
    try {
        let sql = "INSERT INTO mtl_traceback.category (token, item, department_key) VALUES ('" + token + "', '" + item + "', '" + department_key + "');";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function phenomenon_select(key) {
    try {
        let sql = "SELECT * FROM mtl_traceback.phenomenon  where phenomenon.department_key = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function phenomenon_insert(token, item, department_key) {
    try {
        let sql = "INSERT INTO mtl_traceback.phenomenon (token, item, department_key) VALUES ('" + token + "', '" + item + "', '" + department_key + "');";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function symptom_select(key) {
    try {
        let sql = "SELECT * FROM mtl_traceback.symptom  where symptom.department_key = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}


function symptom_insert(token, item, department_key) {
    try {
        let sql = "INSERT INTO mtl_traceback.symptom (token, item, department_key) VALUES ('" + token + "', '" + item + "', '" + department_key + "');";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}


