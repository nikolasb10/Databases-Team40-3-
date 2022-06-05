const express = require('express');
const commonController = require('../controllers/common');
const { mysqlConnection } = require('../connection');

const router = express.Router();

router.get('/',(req,res)=>{
  res.render('../views/common.ejs')
})

// 3.3
router.get('/33choice',function(req,res,next){
    res.render('../views/33choice.ejs')
});

router.get('/33/:id',function(req,res,next){
  const sql = 'SELECT W.project_id, R.first_name, R.last_name \
               FROM works_on as W \
               LEFT JOIN researcher as R \
               ON W.researcher_id = R.researcher_id \
               WHERE project_id in (SELECT project_id \
					                          FROM project \
					                          WHERE ending_date is null and project_id in (SELECT project_id FROM sc_Field_of_Project \
																                                                 WHERE field_name = ?))';
  mysqlConnection.query(sql,[req.params.id],function(err,data,fields){
    if(err) throw err;
    res.render('33',{title: '33', resData: data});
  });
});

// 3.4
router.get('/34',function(req,res,next){
  const sql = 'SELECT distinct S.field_name , P.field_Name, count(S.project_id) as num \
               FROM Sc_field_of_project as S \
               LEFT JOIN Sc_field_of_project as P \
               ON S.project_id = P.project_id \
               WHERE S.Field_name != P.field_Name \
               group by(S.Field_name) \
               ORDER BY ( Num) desc \
               LIMIT 3';
  mysqlConnection.query(sql,function(err,data,fields){
    if(err) throw err;
    res.render('34',{title: '34', resData: data});
  });
});

// 3.5
//router.get('/35', commonController.get35);
router.get('/35',function(req,res,next){
  const sql = 'SELECT distinct S.field_name , P.field_Name, count(S.project_id) as num \
               FROM Sc_field_of_project as S \
               LEFT JOIN Sc_field_of_project as P \
               ON S.project_id = P.project_id \
               WHERE S.Field_name != P.field_Name \
               group by(S.Field_name) \
               ORDER BY ( Num) desc \
               LIMIT 3';
  mysqlConnection.query(sql,function(err,data,fields){
    if(err) throw err;
    res.render('35',{title: '35', resData: data});
  });
});

// 3.6
router.get('/36',function(req,res,next){
  const sql = 'SELECT R.first_name,R.last_name, count(P.project_id) as projects \
               FROM researcher AS R \
               LEFT JOIN works_on AS W \
               ON R.researcher_id = W.researcher_id \
               RIGHT JOIN project AS P \
               ON W.project_id = P.project_id \
               WHERE P.Ending_Date IS NULL AND R.age < 2040 \
               GROUP BY(R.researcher_id) \
               ORDER BY(projects) desc';
  mysqlConnection.query(sql,function(err,data,fields){
    if(err) throw err;
    res.render('36',{title: '36', resData: data});
  });
});

// 3.7
router.get('/37',function(req,res,next){
  const sql = 'SELECT E.first_name, E.last_name, sum(O.organisation_budget) AS total_funding \
               FROM executives AS E \
               LEFT JOIN project AS P \
               ON E.executive_id = P.Executive_id \
               LEFT JOIN organization as O \
               ON O.organization_name = P.organization_name \
               WHERE O.Kind = 1 \
               GROUP BY(E.executive_id) \
               ORDER BY(Total_Funding) desc \
               LIMIT 5';
  mysqlConnection.query(sql,function(err,data,fields){
    if(err) throw err;
    res.render('37',{title: '37', resData: data});
  });
});

// 3.8
router.get('/38',function(req,res,next){
  const sql = 'SELECT first_Name,last_name, num_projects \
               FROM (SELECT R.First_Name,R.Last_name, count(project_id) as num_projects \
                     FROM researcher as R \
                     LEFT JOIN works_on W \
                     ON R.Researcher_id = W.Researcher_id \
                     WHERE (R.Researcher_id,project_id) in (SELECT researcher_id,project_id \
                                                            FROM works_on \
                                                            WHERE Project_id NOT IN (SELECT project_id FROM deliverable)) \
                     GROUP BY(R.researcher_id)) as d \
               WHERE num_projects >= 5;';
  mysqlConnection.query(sql,function(err,data,fields){
    if(err) throw err;
    res.render('38',{title: '38', resData: data});
  });
});

module.exports = router;
