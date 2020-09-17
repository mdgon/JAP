sessionStorage.setItem("boolean", false);


function ingresarHomePage(){
sessionStorage.setItem("email", document.getElementById("emailLogin").value)
sessionStorage.setItem("boolean", true);
sessionStorage.setItem("loginGoogle", false);
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});