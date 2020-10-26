var shippingPercentage = 0.15;

function shipping() {
    //Seleccionas todos los elementos con clase radio
    var input = document.getElementsByClassName("radio");

    //Recorro la cantidad de radioButtons
    for (var i=0; i< input.length; i++) {
        //Se Añade un evento a cada elemento
        input[i].addEventListener("click",function() {
            idRadioButton = this.id
            shippingPercentage = document.getElementById(idRadioButton).value
            modifyPurchaseData();
        });
    }

}

function showProductsCart() {
    
    let productCart ="";
    for (let i = 0; i < cart.articles.length; i++) {

        subTotal = cart.articles[i].unitCost * cart.articles[i].count 

        productCart +=`
            
        <tr Id="tr`+ i +`"> 
        <td class="text-center border" id="nomProduct"> 
            <img src= `+cart.articles[i].src+`> 
        </td>
        <td class="pt-5">
            <h5>`+cart.articles[i].name+`</h5>
        </td>
        <td class="text-center pt-5 precio">
            <h4 id="precio`+ i +`">`+cart.articles[i].currency+` `+ cart.articles[i].unitCost +`</h4>
        </td>
        <td class="cant pt-5">
            <input class="form-control cantidad" type="number" id="cant`+ i +`" min="1" value="`+ cart.articles[i].count +`">
        </td>
        <td class="text-center pt-5">
            <h4 id="productSubtotal`+ i +`">`+cart.articles[i].currency+` `+ subTotal +`</h4>
        </td>
        <td class="text-center pt-5">
            <button id="remove`+ i +`" class="btn btn-sm btn-outline-danger" onclick="removeProducts(this)"><i class="fas fa-times remove"></i></button>
        </td>
      </tr>`
            
          document.getElementById("TableProductsCart").innerHTML = productCart;
    } 
}

function subTotalProduct() {
        //Seleccionas todos los elementos con clase cantidad
        var input = document.getElementsByClassName("cantidad");
    
        //Recorro la cantidad de productos en el carrito
        for (var i=0; i< input.length; i++) {
            //Se Añade un evento a cada elemento
            input[i].addEventListener("change",function() {
                idCantidad = this.id
                let cantidad = document.getElementById(idCantidad).value;
                let idPrecio;
                let precio ="";
                let arrPrecio = []; 
                let comparacion = "";
                let idSubTotal = ""; 
                // recorro la cantidad de productos para usar el id correcto
                for (let b = 0; b < input.length; b++) {
                    comparacion = "cant"+b;
                    idSubTotal = "productSubtotal"+b;
                    if (idCantidad === comparacion) {
                        idPrecio = "precio"+b;
                        valorPrecio = document.getElementById(idPrecio).textContent;
                        arrPrecio = valorPrecio.split(" ")
                        precio = arrPrecio[1]
                        break;
                    }
                }
                let subTotal =   precio * cantidad ;
                document.getElementById(idSubTotal).innerHTML = `<h4 id="`+ idSubTotal+`">`+ arrPrecio[0] + " "+subTotal +`</h4>`

                modifyPurchaseData()
            });
        }

}

function modifyPurchaseData() {
    // listo todos los elementos que que tienen clase precio
    let producto= document.querySelectorAll(".precio");
    let txtPrecio = "";
    let total = 0;
    let subTotal = 0;
    let arrPrecio= [];
    let shippingCost = 0;

    // recorro los productos del carrito
     for (let i = 0; i < producto.length; i++) {
        // busco el h4 que tiene que tiene el id del subtotal 
        let h4 = producto[i].nextElementSibling.nextElementSibling.children
        // obtengo el id del subtotal
        let idSubtotal = h4[0].id
        txtPrecio = document.getElementById(idSubtotal).outerText
        // paso el texto del subtotal a un array y lo separo por un espacio
        arrPrecio = txtPrecio.split(" ")
        // agarro la divisa del producto
        precio = parseInt(arrPrecio[1]);
        //si la moneda del producto es igual a USD lo multiplico por 40
        if (arrPrecio[0] === "USD"){
            precio = precio * 40;
        }

        subTotal = subTotal + precio;
    }   

    shippingCost = subTotal * shippingPercentage
    shippingCost = parseInt(shippingCost);
    total = subTotal + shippingCost
   
    document.getElementById("productSubTotal").innerHTML = "UYU "+subTotal;
    document.getElementById("shippingCost").innerHTML = "UYU "+shippingCost;
    document.getElementById("totalCost").innerHTML = "UYU "+total;

}


function removeProducts( b ){

    let tbody = document.getElementById("TableProductsCart");
    let trId = "";
    trId=b.parentNode.parentNode.id;
    let idButton = b.id;
    trId=b.parentNode.parentNode.id;
    let tr = document.getElementById(trId);

    if(idButton === "borrarTodo"){
        let productos = document.querySelectorAll("#TableProductsCart tr");
        for (let i = 0; i < productos.length; i++) {
            tbody.removeChild(productos[i]);
        }    
    }else{
        tbody.removeChild(tr); 
    }
    modifyPurchaseData();
}

function addPaymentMethod() {
    
}

function showAlert(){


    

        let alert = `
        
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Felicitaciones!</strong> `+mensaje.msg+`
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`

      document.getElementById("alert").innerHTML  = alert;
        
   
}

function validateForm(){
 
    let texto = document.getElementById("tipoPago").outerText;
    
    if(texto === "No se selecciono metodo de pago"){
        document.getElementById("validacionMetodoPago").style.display= "block"
    }else{

        let tipoPago =  document.getElementById("tipoPago").outerText;

        if (tipoPago === "Tarjeta de Credito") {

            let resultNumeroTarjeta = document.getElementById("resultNumeroTarjeta");
            let resultnombreTitular = document.getElementById("resultnombreTitular");
            let resultnombreMonthYear = document.getElementById("resultnombreMonthYear");
            let resultModalCvc = document.getElementById("resultModalCvc");
        
                if (resultNumeroTarjeta.value != "" && resultnombreTitular.value != "" && resultnombreMonthYear.value != "" && resultModalCvc.value != "") {
                showAlert();
                }else{
                    document.getElementById("alerta").innerHTML = `<p>Atencion! falta ingresar datos de la tarjeta decredito</p>`
                }
        }else{

            let resultModalnumeroCuenta = document.getElementById("resultModalnumeroCuenta");
            let resultnombreTitular = document.getElementById("resultnombreTitular");

            if (resultModalnumeroCuenta.value != "" && resultnombreTitular.value != "") {
                showAlert();
                }else{
                    document.getElementById("alerta").innerHTML = `<p>Atencion! falta ingresar datos de la tarjeta decredito</p>`
                }
        }

    }
    
}

function insertPaymentMethod( b ) {
    
    document.getElementById("validacionMetodoPago").style.display= "none"
    let nombreTitular;
    let numeroTarjeta;
    let monthYear;
    let cvc ;
    let numeroCuenta;
    let idButton = b.id;
    let cardwrapper;

    let data;

    if (idButton === "completarTarjeta") {
        nombreTitular = document.getElementById("modalName").value;
        numeroTarjeta = document.getElementById("modalNumberCard").value;
        monthYear = document.getElementById("modalMonthYear").value;
        cvc = document.getElementById("modalCvc").value;
        cardwrapper = document.getElementById("wrapper");
        newcardwrapper = cardwrapper.innerHTML
        

        data = `
        
        <h5 class="mb-2" id="tipoPago">Tarjeta de Credito</h5>
        
        <div class="card-body">

        <div class='card-wrapper' id="newCardWrapper"></div>

        
          <div class="row mt-5">
            <div class="form-group col-sm-6">
            <label for="resultNumeroTarjeta">Numero</label>
              <input class="form-control form-control-rounded" id="resultNumeroTarjeta" placeholder="Numero de Tarjeta"
                type="text" name="number" value="`+ numeroTarjeta +`" required readonly>
            </div>
            <div class="form-group col-sm-6">
            <label for="resultnombreTitular">Nombre</label>
              <input class="form-control form-control-rounded" id="resultnombreTitular" placeholder="Nombre Titular"
                type="text" name="name" value="`+ nombreTitular +`" required readonly/>
            </div>
            <div class="form-group col-sm-3">
            <label for="resultnombreMonthYear">MM/YY</label>
              <input class="form-control form-control-rounded" placeholder="MM/YY" type="text"
                name="expiry" id="resultnombreMonthYear" value="`+ monthYear +`" required readonly/>
            </div>
            <div class="form-group col-sm-3">
              <label for="resultnombreTitular">CVC</label>
              <input class="form-control form-control-rounded" id="resultModalCvc" placeholder="CVC" type="text"
                name="cvc" value="`+ cvc +`" required readonly/>
            </div>
          </div>
        
        </div>
        
        <div id="alerta"></div>`

        document.getElementById("contMetodoEnvio").innerHTML = data;

        document.getElementById("newCardWrapper").innerHTML = newcardwrapper;
        
    } else {

        nombreTitular = document.getElementById("modalNameAcount").value;
        numeroCuenta = document.getElementById("modalNumberAcount").value;

        data = `
        
        <div class="card-body">
           <h3 class="text-center" id="tipoPago"><i class="fas fa-university"></i> Datos Cuenta bancaria </h3>
           <div class="row">
             <div class="form-group col-sm-6">
             <label for="resultnombreTitular">Nombre Cuenta</label>
               <input class="form-control form-control-rounded" placeholder="Nombre"
                 type="text" name="text" id="resultnombreTitular" value="`+ nombreTitular +`" required readonly>
             </div>
             <div class="form-group col-sm-6">
             <label for="resultModalnumeroCuenta">Numero Cuenta</label>
               <input class="form-control form-control-rounded" placeholder="Numero de Cuenta"
                 type="number" name="name" id="resultModalnumeroCuenta" value="`+ numeroCuenta +`" readonly required>
            </div>
        </div>

        <div id="alerta"></div>`
        
        document.getElementById("contMetodoEnvio").innerHTML = data;
    }

}

function showcard() {
    
    var card = new Card({
        form: 'form',
        container: '.card-wrapper',
  
        placeholders: {
          number: '**** **** **** ****',
          name: 'Nombre Apellido',
          expiry: '**/**',
          cvc: '***'
        }
      });

 
}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){ //Llamo al json de los productos para agregar al carrito
        if (resultObj.status === "ok") {
            cart = resultObj.data;

            showProductsCart();
            subTotalProduct();
            modifyPurchaseData();
            shipping();
            
            
        }
    });

    getJSONData(CART_BUY_URL).then(function(resultObj){ 
        if (resultObj.status === "ok") {
            mensaje = resultObj.data;

        }
    });


    showcard();
});

