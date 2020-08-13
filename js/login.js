localStorage.setItem("boolean", 0);
var i = 0

function ingresarHomePage(){
i++;
localStorage.setItem("boolean", i);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});