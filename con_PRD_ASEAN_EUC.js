const oracledb = require("oracledb");
var ws = require('fs').createWriteStream('test.out');

oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.autoCommit = true;

let user = "MTL02268";
let password = "Lind3131";
let connectionString = "M1TAHB.MURATA.CO.JP:11541/PRD_ASEAN_EUC";


module.exports = {
    ins_record_select,
};



async function ins_record_select(key, mode, fac_code) {

    console.log(fac_code)
    console.log(mode)
    console.log(key)


    let connection;

    let where = "";
    if (mode === "1") {
        where = " no00040 = '" + key + "'";
    }
    else if (mode === "2") {
        where = " k_serial = '" + key + "'";
    }
    else if (mode === "3") {
        where = " no00034 = '" + key + "'";
    }
    else if (mode === "4") {
        where = " hi10324 = TO_DATE('" + key + "', 'YYYY-MM-DD') AND cd00106 = '" + fac_code + "'";
    }

    let sql = "SELECT NVL(no00034,'-') AS prd_lot, NVL(cd00163,'-') AS part_name, NVL(no00040,'-') AS ins_no, '-' AS k_serial, TO_CHAR(hi10324, 'YYYY-MM-DD') AS prd_date FROM pv5015 where" + where;

    console.log(sql)
    try {
        connection = await oracledb.getConnection({
            user: user,
            password: password,
            connectionString: connectionString,
        });

        // let sql = "SELECT NVL(no00034,'-') AS prd_lot, NVL(cd00163,'-') AS part_name, NVL(no00040,'-') AS ins_no, '-' AS k_serial, TO_CHAR(hi10324, 'YYYY-MM-DD') AS prd_date FROM pv5015 where" + where;
        // console.log(sql)
        const result = await connection.execute(
            sql
        );
        await connection.close();
        // console.log(result.rows);
        return result.rows;
    } catch (err) {
        console.error(err);
        // return [];
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
                // await connection.close();
                // return [];
            }
        }
    }



}