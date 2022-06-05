const { mysqlConnection } = require('../connection');

// Get 3.5
exports.get35 = (req,res) => {
  mysqlConnection.query('SELECT distinct S.Field_name , P.Field_Name, count(S.project_id) as Num \
                         FROM Sc_field_of_project as S \
                         LEFT JOIN Sc_field_of_project as P \
                         ON S.project_id = P.project_id \
                         WHERE S.Field_name != P.field_Name \
                         group by(S.Field_name) \
                         ORDER BY ( Num) desc \
                         LIMIT 3',(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
};


// Get 3.8
exports.get38 = (req,res) => {
  mysqlConnection.query('SELECT First_Name,Last_name, num_projects \
                         FROM (SELECT R.First_Name,R.Last_name, count(project_id) as num_projects \
                               FROM researcher as R \
                               LEFT JOIN works_on W \
                               ON R.Researcher_id = W.Researcher_id \
                               WHERE (R.Researcher_id,project_id) in (SELECT researcher_id,project_id \
                                                                      FROM works_on \
                                                                      WHERE Project_id NOT IN (SELECT project_id FROM deliverable)) \
                               GROUP BY(R.researcher_id)) as d \
                         WHERE num_projects >= 5;',(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
};
