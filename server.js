const { response } = require('express');
var express = require('express');

var app = express();
const data = require("./backend/app");


// set the view engine to ejs
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    let resp1 = data.aYN;
    let resp2 = data.ayOWN;
    let resp3 = data.lVC;
    let resp4 = data.aON;
    let resp5 = data.query1;
    let resp6 = data.query2;
    let resp7 = data.query3;
    let resp8 = data.query4;
    Promise.all([ //Array de promise, manda la informacion una vez que todas se cumplen
        resp1, resp2,resp3,resp4
    ]).then(responses => {
        var respuestas=[];
        for(var i in responses){
            console.log(responses[i]); //IMPRIME EN CONSOLA 
            respuestas.push[i];
            respuestas[i] = responses[i];
        }
        res.render('pages/index',{
            respuesta1: respuestas[0], //Mandando informacion al frontend
            respuesta2: respuestas[1],
            respuesta3: respuestas[2],
            respuesta4: respuestas[3],
            respuesta5: resp5,
            respuesta6: resp6,
            respuesta7: resp7,
            respuesta8: resp8,
            
        });
       
      });
    
});

app.listen(8080);