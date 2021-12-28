// IMPORTAR FETCH DE NODEJS PARA RECUPERAR LOS DATOS JSON
const fetch = require('node-fetch');

//URL DE LOS DATOS
const url = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow";

//Conectando al enlace 
const resp = async () => {
    return (await fetch(url)
    .then(res => res.json())
    .then(data => data.items)
    .catch(e =>{
        console.log('Error en conexion: '+ e);
    }));
}

//Funcion para recuperar el numero de respuestas contestadas y no contestadas
async function answersYN(){
    const res =  await resp();
    let ansY=0, ansN=0;
    for(var x in res){
        if(res[x].is_answered == true) // Si esta contestada, incrementa el contador ansY
            ansY+=1;
        else if(res[x].is_answered == false) // Si esta contestada, incrementa el contador ansN
            ansN+=1; 
    }
    const respuestas = "Respuestas Contestadas " + ansY +" Respuestas no contestadas "+ansN ;
    return respuestas;
}
//Funcion para obtener la respuesta con mayor owners
async function answerOwners(){
    const res =  await resp();
    let owners = res[0];
    for(var x in res){
        if(res[x].owner.reputation > owners.owner.reputation){ //Compara la reputacion actual con el resultado anterior almacenado
            owners = res[x] ; //En caso de que sea mayor, la actualiza
        }
    }
    const respuesta = "Respuesta con mayor owners " +owners.owner.reputation
            +" con titulo " + owners.title;
    return (respuesta);
}
//Funcion para obtener la respuesta con menor numero de vistas
async function lowestViewCount(){
    const res = await resp();
    let view_count = res[0];
    for(var x in res){
        if(res[x].view_count < view_count.view_count)//Compara el numero de vistas con el resultado anterior almacenado
            view_count = res[x] //En caso de que sea mayor, la actualiza
    }
    const respuesta = "Respuesta con menor numero de vistas:  "
    +" ID: "+view_count.question_id +" con titulo "+view_count.title;
    return(respuesta);
}
//Funcion para obtener la respuesta mas vieja y mas actual
async function answerON(){
    const res = await resp();
    let respActual = res[0], respVieja = res[0]; //Asigna valores iniciales a las variables
    for(var x in res){
        if(res[x].creation_date < respVieja.creation_date) //Compara la fecha mas vieja en la posicion x con la variable respVieja
            respVieja = res[x];       //Si es menor, la cambia 
        if(res[x].creation_date > respActual.creation_date)  //Compara la fecha mas vieja en la posicion x con la variable respActual
            respActual = res[x]; //Si es mayor, la cambia
    }
    const respuesta ="ID de la respuesta mas vieja "+respVieja.question_id  +" ID de la respuesta mas nueva " + respActual.question_id;
    return(respuesta);
}
 
//Asigna funciones a variables para exportarlas y poder usarlas posteriormente
var aYN = answersYN(), ayOWN=answerOwners(), 
    lVC= lowestViewCount(),aON= answerON(),
    query1= "SELECT TOP 1 COUNT(id_MOVIMIENTO) AS MOVIMIENTOS, v.ID_AEROPUERTO, A.NOMBRE_AEROPUERTO  FROM vuelos v INNER JOIN aeropuertos A ON a.ID_AEROPUERTO = v.ID_AEROPUERTO GROUP BY DIA,v.id_aeropuerto,A.NOMBRE_AEROPUERTO ORDER BY COUNT(id_MOVIMIENTO) desc ;";
    query2= "SELECT TOP 1 COUNT(V.ID_AEROLINEA) AS VUELOS,A.NOMBRE_AEROLINEA  FROM aerolineas A INNER JOIN vuelos V ON A.ID_AEROLINEA=V.ID_AEROLINEA WHERE YEAR(DIA)='2021' GROUP BY YEAR(DIA),A.NOMBRE_AEROLINEA ORDER BY COUNT(V.ID_AEROLINEA) desc  ;",
    query3 = " SELECT dia FROM vuelos GROUP BY dia HAVING COUNT(ID_MOVIMIENTO)=(SELECT MAX(CONTEO) FROM (SELECT COUNT(ID_MOVIMIENTO) AS CONTEO,DIA FROM vuelos GROUP BY DAY(DIA),DIA) AS V);",
    query4 = "SELECT A.NOMBRE_AEROLINEA FROM aerolineas A INNER JOIN VUELOS V on A.ID_AEROLINEA = V.ID_AEROLINEA GROUP BY V.ID_AEROLINEA,A.NOMBRE_AEROLINEA HAVING COUNT(V.ID_MOVIMIENTO)>2;";
module.exports= {aYN,ayOWN,lVC,aON,query1,query2,query3,query4};