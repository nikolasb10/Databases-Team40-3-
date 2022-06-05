const { mysqlConnection } = require('../connection');
const express = require('express');
const viewController = require('../controllers/view');
const router = express.Router();
const axios = require('axios');


router.get('/',(req, res) =>{
    // Make a get request to axios
    axios.get('http://localhost:3000/view/researchers')
     .then(function(response){
       res.render('../views/view.ejs',{users: response.data});
     })
     .catch(err => {
       res.send(err);
     })
})

// Researchers
router.get('/researchers', viewController.getResearchers);
router.get('/researchers/:id', viewController.getResearcher);
router.get('/researchers/gender/:gender', viewController.getResearcherGender);

// Executives
router.get('/executives', viewController.getExecutives);

// Programs
router.get('/programs',function(req,res,next){
  const sql = 'SELECT * FROM program';
  mysqlConnection.query(sql,function(err,data,fields){
    if(err) throw err;
    res.render('programs',{title: 'programs', resData: data});
  });
});

router.get('/programs/:id',function(req,res,next){
  const sql = 'SELECT * FROM program WHERE Administration = ?';
  mysqlConnection.query(sql,[req.params.id],function(err,data,fields){
    if(err) throw err;
    res.render('programsadm',{title: 'programsadm', resData: data});
  });
});

// Projects
router.get('/projects',function(req,res,next){
  const sql = 'SELECT * FROM project';
  mysqlConnection.query(sql,function(err,data,fields){
    if(err) throw err;
    res.render('projects',{title: 'projects', resData: data});
  });
});

router.get('/projects/:id',function(req,res,next){
  const sql = 'SELECT * \
               FROM researcher \
               WHERE researcher_id in (SELECT researcher_id \
						                           FROM works_on \
						                           WHERE project_id = ?)';
  mysqlConnection.query(sql,[req.params.id],function(err,data,fields){
    if(err) throw err;
    res.render('projectid',{title: 'projectid', resData: data});
  });
});

router.get('/projects/exec/:id',function(req,res,next){
  const sql = 'SELECT * FROM project WHERE executive_id = ?';
  mysqlConnection.query(sql,[req.params.id],function(err,data,fields){
    if(err) throw err;
    res.render('projectexid',{title: 'projectexid', resData: data});
  });
});

// Views
router.get('/projects_res',function(req,res,next){
  const sql = 'SELECT * FROM Researchers_And_Projects';
  mysqlConnection.query(sql,[req.params.id],function(err,data,fields){
    if(err) throw err;
    res.render('projects_res',{title: 'projects_res', resData: data});
  });
});

router.get('/res_rev',function(req,res,next){
  const sql = 'SELECT * FROM Researchers_And_Review';
  mysqlConnection.query(sql,[req.params.id],function(err,data,fields){
    if(err) throw err;
    res.render('res_rev',{title: 'res_rev', resData: data});
  });
});

module.exports = router;
