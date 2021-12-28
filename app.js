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
export async function answersYN(){
    const res =  await resp();
    let ansY=0, ansN=0;
    for(var x in res){
        if(res[x].is_answered == true) // Si esta contestada, incrementa el contador ansY
            ansY+=1;
        else if(res[x].is_answered == false) // Si esta contestada, incrementa el contador ansN
            ansN+=1; 
    }
    console.log("ANSY "+ ansY + " ANSN "+ansN);
}
//Funcion para obtener la respuesta con mayor owners
async function answerOwners(){
    const res =  await resp();
    let owner = 0, position=0;;
    for(var x in res){
        if(res[x].owner.reputation > owner){ //Compara la reputacion actual con el resultado anterior almacenado
            owner = res[x].owner.reputation ; //En caso de que sea mayor, la actualiza
            position=x; // y cambia el valor de la posicion.
        }
    }
    console.log(res[position]);
}
//Funcion para obtener la respuesta con menor numero de vistas
async function lowestViewCount(){
    const res = await resp();
    let view_count = res[0], position = 0;
    for(var x in res){
        if(res[x].view_count < view_count.view_count)//Compara el numero de vistas con el resultado anterior almacenado
            view_count = res[x] //En caso de que sea mayor, la actualiza
    }
    console.log(view_count);
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
    console.log(respVieja);
    console.log(respActual);
}

//IMPRIMIR EN CONSOLA DEL PUNTO 2 - 5

answersYN();
answerOwners();
lowestViewCount();
answerON();


