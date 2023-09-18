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

    kla_insert,
    kla_select,
    klb_insert,
    klb_select,
    klc_insert,
    klc_select,
    flag_select,
    register_item_insert,
    register_item_select,
    identify_method_select,
    complaint_record_select,
    result_select,
    complaint_record_insert,
    ins_record_select,
    complaint_record_info_insert,
    complaint_record_info_select,
    complaint_record_info_with_compaint_code,
    complaint_record_select_with_comapint_code,
    departments_select,
    user_position_select,
    user_table_select,
    userinfo_insert,
    userinfo_delete,
    userinfo_update,

};


function logIn(username, password) {

    password = encrypt(password);
    try {
        let sql = "SELECT hyper_dx_mtl.userinfo.*, hyper_dx_mtl.departments.dep_name, hyper_dx_mtl.departments.fac_code, hyper_dx_mtl.departments.id FROM hyper_dx_mtl.userinfo left join hyper_dx_mtl.departments on hyper_dx_mtl.departments.department_key = hyper_dx_mtl.userinfo.department_key WHERE hyper_dx_mtl.userinfo.EmpCode = '" + username + "' AND hyper_dx_mtl.userinfo.Passwords = '" + password + "';";
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

function kla_insert(kla_code, kla_name, dep_code, emp_code, last_update) {
    try {
        let sql = "INSERT INTO mtl_traceback.kla (kla_code, kla_name, dep_code , emp_code, last_update) VALUES ('" + kla_code.toUpperCase() + "', '" + kla_name + "', '" + dep_code + "', '" + emp_code + "', '" + last_update + "');";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }


}

function kla_select(key) {
    try {
        let sql = "SELECT * FROM mtl_traceback.kla  where kla.dep_code = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function klb_insert(klb_code, klb_name, dep_code, kla_code, emp_code, last_update) {
    try {
        let sql = "INSERT INTO mtl_traceback.klb (klb_code, klb_name, dep_code, kla_code, emp_code, last_update) VALUES ('" + klb_code.toUpperCase() + "', '" + klb_name + "', '" + dep_code + "', '" + kla_code + "', '" + emp_code + "', '" + last_update + "');";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }


}



function klb_select(key) {
    try {
        let sql = "SELECT * FROM mtl_traceback.klb  where klb.kla_code = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}


function klc_insert(klc_code, klc_name, dep_code, kla_code, klb_code, emp_code, last_update) {
    try {
        let sql = "INSERT INTO mtl_traceback.klc (klc_code, klc_name, dep_code, kla_code, klb_code, emp_code, last_update) VALUES ('" + klc_code.toUpperCase() + "', '" + klc_name + "', '" + dep_code + "', '" + kla_code + "', '" + klb_code + "', '" + emp_code + "', '" + last_update + "');";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }


}

function klc_select(key) {
    try {
        let sql = "SELECT * FROM mtl_traceback.klc  where klc.klb_code = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}


function flag_select(key) {
    try {
        let sql = "SELECT * FROM mtl_traceback.flag where dep_code = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function register_item_insert(item_code, item_name, item_source, dep_code, flag_code, emp_code, last_update) {
    try {
        let sql = "INSERT INTO mtl_traceback.register_item (item_code, item_name, item_source, dep_code, flag_code, emp_code, last_update) VALUES ('" + item_code.toUpperCase() + "', '" + item_name + "', '" + item_source + "', '" + dep_code + "', '" + flag_code + "', '" + emp_code + "', '" + last_update + "');";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }


}



function register_item_select(key) {
    try {
        let sql = "SELECT register_item.item_code, register_item.item_name, register_item.item_source, register_item.dep_code, register_item.flag_code, flag.flag_name , register_item.emp_code, register_item.last_update FROM register_item LEFT JOIN flag ON flag.flag_code = register_item.flag_code WHERE register_item.dep_code = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function identify_method_select() {
    try {
        let sql = "SELECT * FROM mtl_traceback.identify_method where en=1;";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}


function complaint_record_select(dep_code, kla_code, klb_code) {
    try {
        // let sql = "SELECT IFNULL(null, 0) AS slt, '' as result_code, complaint_record.k_mode, register_item.item_name, register_item.item_source, register_item.item_code, IFNULL(NULL, 0) AS rate, IFNULL(NULL, 0) AS eff, register_item.dep_code, kla.kla_code, kla.kla_name, klb.klb_code, klb.klb_name FROM register_item LEFT JOIN kla ON kla.dep_code = register_item.dep_code LEFT JOIN klb ON klb.dep_code = register_item.dep_code AND klb.kla_code = kla.kla_code LEFT JOIN complaint_record ON complaint_record.dep_code = register_item.dep_code AND complaint_record.kla_code = kla.kla_code AND complaint_record.klb_code = klb.klb_code WHERE register_item.dep_code = '" + dep_code + "' AND kla.kla_code = '" + kla_code + "' AND klb.klb_code = '" + klb_code + "';";



        let sql = "SELECT IFNULL(NULL, 0) AS slt, '' AS result_code, IFNULL(tb200.rate*100, 0) AS rate, IFNULL(tb200.eff*100, 0) AS eff, tb100.item_name, tb100.item_source, tb100.item_code, tb100.dep_code, tb100.kla_code, tb100.kla_name, tb100.klb_code, tb100.klb_name FROM (SELECT register_item.item_name, register_item.item_source, register_item.item_code, register_item.dep_code, kla.kla_code, kla.kla_name, klb.klb_code, klb.klb_name FROM register_item LEFT JOIN kla ON kla.dep_code = register_item.dep_code LEFT JOIN klb ON klb.dep_code = register_item.dep_code AND klb.kla_code = kla.kla_code WHERE register_item.dep_code = '" + dep_code + "' AND kla.kla_code = '" + kla_code + "' AND klb.klb_code = '" + klb_code + "') tb100 LEFT JOIN (SELECT complaint_record.dep_code, complaint_record.kla_code, complaint_record.klb_code, complaint_record.item_code, SUM(complaint_record.slt) / COUNT(complaint_record.dep_code) AS rate, IFNULL(SUM(result.result_value) / COUNT(complaint_record.dep_code), 0) AS eff FROM mtl_traceback.complaint_record LEFT JOIN result ON result.result_code = complaint_record.result_code WHERE complaint_record.dep_code = '" + dep_code + "' AND complaint_record.kla_code = '" + kla_code + "' AND complaint_record.klb_code = '" + klb_code + "' AND complaint_record.k_mode = 1 GROUP BY complaint_record.dep_code , complaint_record.kla_code , complaint_record.klb_code , complaint_record.item_code) tb200 ON tb200.item_code = tb100.item_code AND tb200.kla_code = tb100.kla_code AND tb200.klb_code = tb100.klb_code";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function complaint_record_select_with_comapint_code(dep_code, kla_code, klb_code, complaint_code) {
    try {
        let sql = "SELECT IFNULL(tb300.slt, 0) AS slt, tb300.result_code AS result_code, IFNULL(tb200.rate * 100, 0) AS rate, IFNULL(tb200.eff * 100, 0) AS eff, tb100.item_name, tb100.item_source, tb100.item_code, tb100.dep_code, tb100.kla_code, tb100.kla_name, tb100.klb_code, tb100.klb_name FROM (SELECT register_item.item_name, register_item.item_source, register_item.item_code, register_item.dep_code, kla.kla_code, kla.kla_name, klb.klb_code, klb.klb_name FROM register_item LEFT JOIN kla ON kla.dep_code = register_item.dep_code LEFT JOIN klb ON klb.dep_code = register_item.dep_code AND klb.kla_code = kla.kla_code WHERE register_item.dep_code = '" + dep_code + "' AND kla.kla_code = '" + kla_code + "' AND klb.klb_code = '" + klb_code + "') tb100 LEFT JOIN (SELECT complaint_record.dep_code, complaint_record.kla_code, complaint_record.klb_code, complaint_record.item_code, SUM(complaint_record.slt) / COUNT(complaint_record.dep_code) AS rate, IFNULL(SUM(result.result_value) / COUNT(complaint_record.dep_code), 0) AS eff FROM mtl_traceback.complaint_record LEFT JOIN result ON result.result_code = complaint_record.result_code WHERE complaint_record.dep_code = '" + dep_code + "' AND complaint_record.kla_code = '" + kla_code + "' AND complaint_record.klb_code = '" + klb_code + "' AND complaint_record.k_mode = 1 GROUP BY complaint_record.dep_code , complaint_record.kla_code , complaint_record.klb_code , complaint_record.item_code) tb200 ON tb200.item_code = tb100.item_code AND tb200.kla_code = tb100.kla_code AND tb200.klb_code = tb100.klb_code LEFT JOIN (SELECT complaint_record.slt, complaint_record.item_code, complaint_record.result_code FROM complaint_record WHERE complaint_record.complaint_code = '" + complaint_code + "') tb300 ON tb300.item_code = tb100.item_code;";



        // sql = "SELECT IFNULL(NULL, 0) AS slt, '' AS result_code, IFNULL(tb200.rate*100, 0) AS rate, IFNULL(tb200.eff*100, 0) AS eff, tb100.item_name, tb100.item_source, tb100.item_code, tb100.dep_code, tb100.kla_code, tb100.kla_name, tb100.klb_code, tb100.klb_name FROM (SELECT register_item.item_name, register_item.item_source, register_item.item_code, register_item.dep_code, kla.kla_code, kla.kla_name, klb.klb_code, klb.klb_name FROM register_item LEFT JOIN kla ON kla.dep_code = register_item.dep_code LEFT JOIN klb ON klb.dep_code = register_item.dep_code AND klb.kla_code = kla.kla_code WHERE register_item.dep_code = '" + dep_code + "' AND kla.kla_code = '" + kla_code + "' AND klb.klb_code = '" + klb_code + "') tb100 LEFT JOIN (SELECT complaint_record.dep_code, complaint_record.kla_code, complaint_record.klb_code, complaint_record.item_code, SUM(complaint_record.slt) / COUNT(complaint_record.dep_code) AS rate, IFNULL(SUM(result.result_value) / COUNT(complaint_record.dep_code), 0) AS eff FROM mtl_traceback.complaint_record LEFT JOIN result ON result.result_code = complaint_record.result_code WHERE complaint_record.dep_code = '" + dep_code + "' AND complaint_record.kla_code = '" + kla_code + "' AND complaint_record.klb_code = '" + klb_code + "' AND complaint_record.k_mode = 1 GROUP BY complaint_record.dep_code , complaint_record.kla_code , complaint_record.klb_code , complaint_record.item_code) tb200 ON tb200.item_code = tb100.item_code AND tb200.kla_code = tb100.kla_code AND tb200.klb_code = tb100.klb_code";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}


function result_select(key) {
    try {
        let sql = "SELECT * FROM mtl_traceback.result where dep_code = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }
}
function complaint_record_insert(complaint_code, kla_code, klb_code, klc_code, slt, item_code, result_code, dep_code, k_mode, emp_code, last_update) {
    try {
        let sql = "INSERT INTO mtl_traceback.complaint_record(complaint_code, kla_code, klb_code, klc_code, slt, item_code, result_code, dep_code, k_mode, emp_code, last_update) VALUES('" + complaint_code + "', '" + kla_code + "', '" + klb_code + "', '" + klc_code + "', '" + slt + "', '" + item_code + "', '" + result_code + "', '" + dep_code + "', '" + k_mode + "', '" + emp_code + "', last_update='" + last_update + "') ON DUPLICATE KEY UPDATE  kla_code='" + kla_code + "', klb_code='" + klb_code + "', klc_code='" + klc_code + "', slt='" + slt + "', result_code='" + result_code + "' , dep_code='" + dep_code + "', k_mode='" + k_mode + "', emp_code='" + emp_code + "', last_update='" + last_update + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }


}


function ins_record_select(key, mode, fac_code) {
    try {
        let where = "";
        if (mode === "1") {
            where = " ins_no = '" + key + "';";
        }
        else if (mode === "2") {
            where = " k_serial = '" + key + "';";
        }
        else if (mode === "3") {
            where = " prd_lot = '" + key + "';";
        }
        else if (mode === "4") {
            where = " STR_TO_DATE(prd_date, '%Y-%m-%d') = STR_TO_DATE('" + key + "', '%Y-%m-%d') AND fac_code='" + fac_code + "';";
        }


        let sql = "SELECT * FROM mtl_traceback.ins_record where " + where;
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }
}



function complaint_record_info_insert(complaint_code, ins_no, prd_lot, part_name, k_serial, prd_date, qcs_no, kla_code, klb_code, klc_code, k_mode, dep_code, method_id, method_value, emp_code, last_update) {
    try {
        let sql = "INSERT INTO mtl_traceback.complaint_record_info (complaint_code, ins_no, prd_lot, part_name, k_serial, prd_date, qcs_no, kla_code, klb_code, klc_code, k_mode, dep_code, method_id, method_value, emp_code, last_update) VALUES ('" + complaint_code + "', '" + ins_no + "', '" + prd_lot + "', '" + part_name + "', '" + k_serial + "', '" + prd_date + "', '" + qcs_no + "', '" + kla_code + "', '" + klb_code + "', '" + klc_code + "', '" + k_mode + "', '" + dep_code + "', " + method_id + ", '" + method_value + "', emp_code='" + emp_code + "', last_update='" + last_update + "')  ON DUPLICATE KEY UPDATE ins_no='" + ins_no + "', prd_lot='" + prd_lot + "', part_name='" + part_name + "', k_serial='" + k_serial + "', prd_date='" + prd_date + "', qcs_no='" + qcs_no + "', kla_code='" + kla_code + "', klb_code='" + klb_code + "', klc_code='" + klc_code + "', k_mode='" + k_mode + "', method_id=" + method_id + ", method_value='" + method_value + "', emp_code='" + emp_code + "', last_update='" + last_update + "';";
        console.info(complaint_record_info_insert)
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }


}


function complaint_record_info_select(key) {
    try {
        let sql = "SELECT complaint_record_info.complaint_code, complaint_record_info.ins_no, complaint_record_info.prd_lot, complaint_record_info.part_name, complaint_record_info.k_serial, complaint_record_info.prd_date, complaint_record_info.qcs_no, complaint_record_info.qcs_no, complaint_record_info.kla_code, kla.kla_name, complaint_record_info.klb_code, klb.klb_name, complaint_record_info.klc_code, klc.klc_name, complaint_record_info.k_mode, complaint_record_info.method_id, complaint_record_info.method_value, complaint_record_info.emp_code, complaint_record_info.last_update FROM mtl_traceback.complaint_record_info LEFT JOIN kla ON kla.kla_code = complaint_record_info.kla_code LEFT JOIN klb ON klb.klb_code = complaint_record_info.klb_code LEFT JOIN klc ON klc.klc_code = complaint_record_info.klc_code WHERE complaint_record_info.dep_code = '" + key + "';";
        console.log("complaint_record_info_select")
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }
}


function complaint_record_info_with_compaint_code(dep_code, complaint_code) {
    try {
        let sql = "SELECT complaint_record_info.complaint_code, complaint_record_info.ins_no, complaint_record_info.prd_lot, complaint_record_info.part_name, complaint_record_info.k_serial, complaint_record_info.prd_date, complaint_record_info.qcs_no, complaint_record_info.qcs_no, complaint_record_info.kla_code, kla.kla_name, complaint_record_info.klb_code, klb.klb_name, complaint_record_info.klc_code, klc.klc_name, complaint_record_info.k_mode, complaint_record_info.method_id, complaint_record_info.method_value,complaint_record_info.emp_code, complaint_record_info.last_update FROM mtl_traceback.complaint_record_info LEFT JOIN kla ON kla.kla_code = complaint_record_info.kla_code LEFT JOIN klb ON klb.klb_code = complaint_record_info.klb_code LEFT JOIN klc ON klc.klc_code = complaint_record_info.klc_code WHERE complaint_record_info.dep_code = '" + dep_code + "' and complaint_record_info.complaint_code='" + complaint_code + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }
}

function departments_select() {
    try {
        let sql = "SELECT * FROM hyper_dx_mtl.departments order by hyper_dx_mtl.departments.dep_name;";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function user_position_select() {
    try {
        let sql = "SELECT * FROM hyper_dx_mtl.user_position;";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function user_table_select(user_position, department_key) {
    try {
        let sql = "SELECT hyper_dx_mtl.userinfo.*, hyper_dx_mtl.user_position.item, hyper_dx_mtl.departments.dep_name, hyper_dx_mtl.departments.fac_code FROM hyper_dx_mtl.userinfo LEFT JOIN hyper_dx_mtl.user_position ON hyper_dx_mtl.user_position.id = hyper_dx_mtl.userinfo.UserPosition left join hyper_dx_mtl.departments on hyper_dx_mtl.departments.department_key = hyper_dx_mtl.userinfo.department_key WHERE CASE WHEN 0 = " + user_position + " THEN TRUE WHEN 0 < " + user_position + " THEN hyper_dx_mtl.userinfo.department_key = '" + department_key + "' ELSE false END;";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}



function userinfo_insert(EmpCode, Passwords, FirstName, LastName, UserPosition, department_key) {

    Passwords = encrypt(Passwords);

    try {
        let sql = "INSERT INTO hyper_dx_mtl.userinfo (hyper_dx_mtl.userinfo.EmpCode, hyper_dx_mtl.userinfo.Passwords, hyper_dx_mtl.userinfo.FirstName, hyper_dx_mtl.userinfo.LastName, hyper_dx_mtl.userinfo.UserPosition, hyper_dx_mtl.userinfo.department_key) VALUES ('" + EmpCode + "', '" + Passwords + "', '" + FirstName + "', '" + LastName + "', " + UserPosition + ", '" + department_key + "') on duplicate key update hyper_dx_mtl.userinfo.Passwords = '" + Passwords + "', hyper_dx_mtl.userinfo.FirstName = '" + FirstName + "', hyper_dx_mtl.userinfo.LastName = '" + LastName + "', hyper_dx_mtl.userinfo.UserPosition = " + UserPosition + ",  hyper_dx_mtl.userinfo.department_key = '" + department_key + "'";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }


}


function userinfo_delete(key) {
    try {
        let sql = "DELETE FROM hyper_dx_mtl.userinfo WHERE hyper_dx_mtl.userinfo.EmpCode = '" + key + "';";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}


function userinfo_update(EmpCode, FirstName, LastName, Passwords) {

    let sql_pass = '';

    console.log(Passwords)

    if (Passwords !== "") {
        Passwords = encrypt(Passwords);
        sql_pass = ", hyper_dx_mtl.userinfo.Passwords = '" + Passwords + "' ";
    }


    try {
        let sql = "UPDATE hyper_dx_mtl.userinfo SET hyper_dx_mtl.userinfo.FirstName = '" + FirstName + "', hyper_dx_mtl.userinfo.LastName = '" + LastName + "' " + sql_pass + " WHERE (hyper_dx_mtl.userinfo.EmpCode = '" + EmpCode + "');";
        console.log(sql)
        const result = pool.query(sql);

        if (result) {
            return result;
        }
    } catch { }

}

function encrypt(text) {
    var sha512 = require("hash.js/lib/hash/sha/512");
    return sha512().update(text).digest("hex");
}
























