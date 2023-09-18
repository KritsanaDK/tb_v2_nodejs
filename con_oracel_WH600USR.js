const oracledb = require("oracledb");
var ws = require('fs').createWriteStream('test.out');

oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.autoCommit = true;

let user = "WH600USR";
let password = "600usr0223";
let connectionString = "MTL-ORACLE-SVR:1521/MTLE";


module.exports = {
    ins_record_select,
};



async function ins_record_select(key, mode, fac_code) {

    console.log(fac_code)
    console.log(mode)
    console.log(key)


    let connection;

    let where = "";
    let sql = "SELECT NVL(SSR_PTS0001.DHC0061,'n/a') AS ins_no, NVL(SSR_PTH4798.NOC0027, 'n/a') AS prd_lot, SSR_PTH4798.CDC0163 AS part_name, TO_CHAR(SSR_PTH4798.HID1000, 'YYYY-MM-DD') AS prd_date , NVL(SSR_PTH4798.NOC0606,'n/a') AS k_serial FROM SSR_PTH4798 INNER JOIN SSR_PTS0001 ON SSR_PTH4798.NOC0027 = SSR_PTS0001.NOC0027 INNER JOIN SSR_PTH0001 ON SSR_PTH0001.NOC0027 = SSR_PTH4798.NOC0027 where";

    if (mode === "1") {
        // ins_no
        sql = "SELECT NVL(SSR_PTH0001.DHC0061,'n/a') AS ins_no, NVL(SSR_PTH0001.NOC0027, 'n/a') AS prd_lot, SSR_PTH0001.CDC0163 AS part_name, TO_CHAR(SSR_PTH0001.HID1000, 'YYYY-MM-DD') AS prd_date , 'n/a' AS k_serial FROM SSR_PTH0001 where";
        where = " SSR_PTH0001.DHC0061 like '%" + key + "%'";
    }
    else if (mode === "2") {
        // Serial
        // sql = "SELECT NVL(SSR_PTH0001.DHC0061,'n/a') AS ins_no, NVL(SSR_PTH0001.NOC0027, 'n/a') AS prd_lot, SSR_PTH0001.CDC0163 AS part_name, TO_CHAR(SSR_PTH0001.HID1000, 'YYYY-MM-DD') AS prd_date , 'n/a' AS k_serial FROM SSR_PTH0001 where";
        where = " SSR_PTH4798.NOC0606 LIKE '%" + key + "%'";
    }
    else if (mode === "3") {
        // PRD Lot
        where = " SSR_PTH0001.NOC0027 like '%" + key + "%'";
    }
    else if (mode === "4") {
        // Date
        where = " TO_CHAR(SSR_PTH4798.HID1000, 'YYYY-MM-DD') = '" + key + "'";
    }

    // let sql = "SELECT NVL(SSR_PTS0001.DHC0061,'n/a') AS ins_no, NVL(SSR_PTH4798.NOC0027, 'n/a') AS prd_lot, SSR_PTH4798.CDC0163 AS part_name, TO_CHAR(SSR_PTH4798.HID1000, 'YYYY-MM-DD') AS prd_date , NVL(SSR_PTH4798.NOC0606,'n/a') AS k_serial FROM SSR_PTH4798 LEFT JOIN SSR_PTS0001 ON SSR_PTH4798.NOC0027 = SSR_PTS0001.NOC0027 where" + where;
    // let sql = "SELECT NVL(SSR_PTS0001.DHC0061,'n/a') AS ins_no, NVL(SSR_PTH4798.NOC0027, 'n/a') AS prd_lot, SSR_PTH4798.CDC0163 AS part_name, TO_CHAR(SSR_PTH4798.HID1000, 'YYYY-MM-DD') AS prd_date , NVL(SSR_PTH4798.NOC0606,'n/a') AS k_serial FROM SSR_PTH4798 LEFT JOIN SSR_PTS0001 ON SSR_PTH4798.NOC0027 = SSR_PTS0001.NOC0027 LEFT JOIN SSR_PTH0001 ON SSR_PTH0001.NOC0027 = SSR_PTS0001.NOC0027 where" + where;
    sql = sql + where
    // if (mode != "2") {
    //     sql = "SELECT NVL(SSR_PTH0001.DHC0061,'n/a') AS ins_no, NVL(SSR_PTH0001.NOC0027, 'n/a') AS prd_lot, SSR_PTH0001.CDC0163 AS part_name, TO_CHAR(SSR_PTH0001.HID1000, 'YYYY-MM-DD') AS prd_date , 'n/a' AS k_serial FROM SSR_PTH0001 Where " + where
    // }

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