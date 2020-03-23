const app = require('express').Router();
const sendhello = require('../controller/handle')
const STD = require('../controller/handle')
app.get('/h', (req, res) => {
    res.send('hello')
})
app.post('/hello',(req,res)=>{
    var putname = new sendhello().sayhello(req);
    res.json("hello "+putname);
})

app.post('/createstd',(req,res)=>{
    var create_student = new STD().createStd_ID(req.body);
   //res.json(req.body)
   res.json(create_student)

})

app.post('/querystd',(req,res)=>{
    var query_stdudent = new STD().queryStd_ID(req.body);
    res.json(query_stdudent)
})

app.post('/queryallstd',(req,res)=>{
    var query_allstdudent = new STD().queryallStd_ID(req.body);
    res.json(query_allstdudent)
})

app.post('/updategrade',(req,res)=>{
    var update_grade = new STD().update_GRADE(req.body);
    res.json(update_grade)
})

app.post('/deletestd',(req,res)=>{
    var delete_student = new STD().deletestd_ID(req.body);
    res.json(delete_student)
})
module.exports = app