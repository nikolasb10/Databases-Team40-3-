const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const path = require('path');

app.use(bodyparser.json());
app.listen(3000,()=>console.log('Express server is running at port no: 3000'));

//route setup for homepage
app.get('/', (req, res) =>{
    res.render('../views/index.ejs')
})

// set view engine
app.set("view engine","ejs")
//app.set(view,path.resolve(__dirname,"views/ejs"))

// load assets
app.use(express.static(path.resolve(__dirname,"assets")))

// Routes
const viewRoutes = require('./routes/view');
app.use('/view',viewRoutes);

const editRoutes = require('./routes/edit');
app.use('/edit',editRoutes);

const commonRoutes = require('./routes/common');
app.use('/common',commonRoutes);

/*
// Get the researchers that work in a specific project
app.get('/workson/project/:proj_id',(req,res)=>{
  mysqlConnection.query('SELECT First_Name,Last_Name \
                         FROM researcher \
                         WHERE researcher_id in (SELECT researcher_id \
                                                 FROM works_on \
                                                 WHERE project_id = ?)'),[req.params.proj_id],(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  }
});*/
