const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const moment = require('moment')
var sql = require("mssql");
// config for your database
var config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'Padoru'
};

// connect to your database
var err = sql.connect(config)
if (err) console.log(err);


app.use(bodyParser.json());

class Hello {
    sayhello(req) {
        var name = req.body.name;
        return name;
    }

    async createStd_ID(req) { //ไม่รอ
       let FunctionName = '[createStd]'
        return await new Promise(async function (resolve, reject) {    // awaitไม่รอ
            try {
                var fullName = `${req.first_name} ${req.last_name}`
                var time = moment().format();
                var result = {
                    "fullName": fullName,
                    "time": time
                }
                console.log(req.first_name);
                var request = await new sql.Request();
                await request.query(`INSERT INTO farDB.dbo.STUDENT_PROFILE
            (           first_name,          last_name,          faculty_id,      gender,             dmission_date,           grade,        student_status,       create_by,        create_date,   update_by,     work_status)
            VALUES('${req.first_name}', '${req.last_name}' , '${req.faculty_id}' , '${req.gender}' ,   '${time}' ,    '${req.grade}',         'Y'        ,'${fullName}', '${time}', '${fullName}',   'W')`)
                resolve("success")
            } catch (error) {
                console.log(`${FunctionName} error ${error}`)
                reject(`${FunctionName} error ${error}`)
            }
        })

    }

    async queryStd_ID(req){
        var request = new sql.Request();
       var queryid = `SELECT * FROM farDB.dbo.STUDENT_PROFILE WHERE id = '${req.id}'`
       var result = await request.query(queryid)
       //console.log(req.id)
       //console.log(result.recordset[0])
     
       if(result.recordset[0] == undefined ){
       return 'dont have this id'
    }else{
        console.log(result.recordset[0])
        return  result.recordset[0]
    }

    }
    async queryallStd_ID(req){
        var request = new sql.Request();
        var queryfaculty = `SELECT COUNT(*) FROM farDB.dbo.STUDENT_PROFILE WHERE faculty_id = '${req.faculty_id}'`
        var result = await request.query(queryfaculty)
        console.log(result.recordset[0])
    }
    async update_GRADE(req){
        var request = new sql.Request();
        var queryid = `SELECT grade FROM farDB.dbo.STUDENT_PROFILE WHERE id = '${req.id}'`
        var grade_id = await request.query(queryid)
        console.log(grade_id)
        if( grade_id == undefined)
        return 'dont have thid id'
        else{
            var update_grade = `UPDATE farDB.dbo.STUDENT_PROFILE  SET grade ='${req.newgrade}' WHERE id = '${req.id}'`
            request.query(update_grade) //เข้าไปยิงในdatabase
            console.log(req.newgrade)
        }
    }
    async deletestd_ID(req){
        var request = new sql.Request();
        var queryid = `SELECT * FROM farDB.dbo.STUDENT_PROFILE WHERE id = '${req.id}'`
        var querybyid = await request.query(queryid)
        if(querybyid == undefined)
        return 'dont have this id'
        else {
            var delete_std = `DELETE farDB.dbo.STUDENT_PROFILE WHERE id ='${req.id}'`
            request.query(delete_std)
        }

    }

}
module.exports = Hello;