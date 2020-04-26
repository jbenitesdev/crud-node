var express = require("express");
var bodyParser = require('body-parser');
var app = express();
const mysql = require('mysql');
app.use(bodyParser.json());
app.use(function (req, res, next) {
;
res.header('Access-Control-Allow-Origin', '*');
res.header("Access-Control-Allow-Credentials", "true");
res.header('Access-Control-Allow-Methods',
'GET,PUT,POST,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, X-Codingpedia, Authorization');
next();
});

function execSQLQuery(sqlQry, res) {
    
    const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "8601",
    database: "crud01"
});

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
         else
             res.json(results);

        connection.end();
        console.log('executou!');
    });
}

app.get("/pessoas", (req, res) => {
    execSQLQuery("select * from pessoa", res);
});

app.post("/pessoas", (req, res) => {

var nome = req.body.nome;
var email = req.body.email;
var senha = req.body.senha;
execSQLQuery(`insert into pessoa(nome,email,senha)values('${nome}','${email}', '${senha}') `, res);
});

app.delete("/pessoas/:id", (req, res) => {
    execSQLQuery(`delete from pessoa where id=${req.params.id}`, res);
});

app.put("/pessoas/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    execSQLQuery(`update pessoa set nome='${nome}',email='${email}' ,senha='${senha}' where id=${id}`,res);
});


var server = app.listen(3000, "localhost", function () {
var host = server.address().address;
var port = server.address().port;
console.log('Listening as http://%s:%s', host, port);
});