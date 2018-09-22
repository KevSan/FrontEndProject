var express = require('express');
var cors = require('cors');
var pg = require("pg");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json({type: 'application/json'}));
app.use(cors());


var connectionString = "postgres://kevin:123@localhost:5432/kevin";


app.get('/', function (req, res){
    res.send('Hello World')
});


app.post('/recentlyInsertedForm', function (req, res, next){

    var sqlQuery1 = "SELECT * FROM employees WHERE id = " 
                    + req.body.id;

    pg.connect(connectionString, function(err, client, done){
        if(err){
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query(sqlQuery1, [], function(err, result) {
            done();
            if(err){
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    });
});


app.get('/listOfCompanies', function (req, res, next){
    pg.connect(connectionString, function(err, client, done){
        if(err){
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query('SELECT company FROM employees GROUP BY company;', [], function(err, result) {
            done();
            if(err){
                console.log(err);
                res.status(400).send(err);
            }

            var listOfCompanies = []
            for(var i in result.rows){

                listOfCompanies.push(result.rows[i].company)
            };
            res.status(200).send(listOfCompanies);

        });
    });
});


app.post('/companySalaryBudget', function (req, res, next){

    var sqlQuery = "SELECT company, SUM(salary) FROM employees WHERE company = '" 
                    + req.body.company 
                    + "' GROUP BY company";

    pg.connect(connectionString, function(err, client, done){
        if(err){
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query(sqlQuery, [], function(err, result) {
            done();
            if(err){
                res.status(400).send(err);
            }
            
            var totalSpentOnSalary = result.rows[0].sum.toString()
            res.status(200).send(totalSpentOnSalary);
        });
    });
});


app.post('/insertEmployeeForm', function (req, res){

    var sqlQuery = 'INSERT INTO '
                    + 'employees(first_name, last_name, personal_address, company, salary) '
                    + 'VALUES($1, $2, $3, $4, $5) RETURNING ID';
    var data = [
        req.body.firstName,
        req.body.lastName,
        req.body.address,
        req.body.company,
        req.body.salary
    ];

    console.log(req, res);

    pg.connect(connectionString, function(err, client, done){
        if(err){
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query(sqlQuery, data, function(err, result) {
            done();
            if(err){
                res.status(400).send(err);
            }
            var idOfRecentFormInput = result.rows[0].id.toString()
            res.status(200).send(idOfRecentFormInput);
        });
    });
});

app.listen(3002)


//npm install express
//npm install pg-promise
//npm install body-parser
//npm install axios
//npm install cors