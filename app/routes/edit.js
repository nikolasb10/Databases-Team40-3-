const { mysqlConnection } = require('../connection');
const express = require('express');
const router = express.Router();
var flash = require('express-flash');

router.get('/',(req,res)=>{
  res.render('../views/edit.ejs')
})


router.get('/researchers',function(req,res,next){
  const sql = 'SELECT * FROM researcher';
  mysqlConnection.query(sql,function(err,data,fields){
    if(err) throw err;
    res.render('editresearchers',{title: 'Researcher List', resData: data});
  });
});

/* GET home page. */
router.get('/insertres', function(req, res, next) {
  res.render('insertres', { title: 'insertres' });
});
// insert new researcher
router.post('/insertres', function(req, res, next) {
  const researcher_id = req.body.researcher_id;
  var Organization_Name = req.body.Organization_Name;
  var f_name = req.body.f_name;
  var l_name = req.body.l_name;
  var gender = req.body.gender;
  var date_of_birth = req.body.date_of_birth;
  var starting_date = req.body.starting_date;

  var sql = `INSERT INTO researcher(researcher_id,organization_name,first_name,last_name,gender,date_of_birth,starting_date) VALUES ("${researcher_id}","${Organization_Name}","${f_name}", "${l_name}", "${gender}", "${date_of_birth}", "${starting_date}")`;
  mysqlConnection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    req.flash('success', 'Data added successfully!');
    res.redirect('/');
  });
});

// delete researcher
router.get('/delete/:id', function(req, res, next) {
  var researcher_id = { id: req.params.id }
  mysqlConnection.execute(`DELETE FROM researcher WHERE researcher_id = `+ req.params.id, researcher_id, function(err, result) {
    if (err) throw err;
    console.log('record deleted');
    //req.flash('success', 'Data deleted successfully!');
    res.redirect('/edit/researchers');
  });
});/*
router.get('/projects/:id',function(req,res,next){
  const sql = 'DELETE FROM researcher WHERE id = ?)';
  mysqlConnection.query(sql,[req.params.id],function(err,fields){
    if(err) throw err;
    res.render('projectid',{title: 'projectid', resData: data});
  });
});*/

module.exports = router;
