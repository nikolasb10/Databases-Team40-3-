const { mysqlConnection } = require('../connection');

// Get all researchers
exports.getResearchers = (req,res) => {
  mysqlConnection.query('SELECT * FROM researcher',(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
};

// Get researcher with specific id
exports.getResearcher = (req,res) => {
  mysqlConnection.query('SELECT * FROM researcher WHERE Researcher_id = ?',[req.params.id],(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
};

// Get researcher with specific gender
exports.getResearcherGender = (req,res) => {
  mysqlConnection.query('SELECT * FROM researcher WHERE Gender = ?',[req.params.gender],(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
};

// Get all executives
exports.getExecutives = (req,res) => {
  mysqlConnection.query('SELECT * FROM executives',(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
};

// Get all Programs
exports.getPrograms = (req,res) => {
  mysqlConnection.query('SELECT * FROM program',(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
};

exports.getProgram = (req,res) => {
  mysqlConnection.query('SELECT * FROM program WHERE Administration = ?',[req.params.id],(err,rows,fields)=>{
    if(!err) res.send(rows);
    else console.log(err);
  })
};
