//pre-request script

var mistests = () => {
 

    //Validamos cuanto es el tiempo de respuesta de la peticion realizada
    pm.test("Respuesta en menos a 2000ms", function () {
        pm.expect(pm.response.responseTime).to.be.below(2000);
    });

    //Validamos que el status sea correcto
    pm.test("Descripcion del status de la prueba", function(){
        pm.response.to.have.status("Created");
    });

}

pm.environment.set("Genericos",mistests.toString());



//Llamada de pre-request script

if (data.ResultadoName == "TRUE"){
    
    eval(pm.environment.get("Genericos"))();
    
    //Declaracion de json
    var jsonData;
    
    tests["Respuesta codigo 201 correcto "]   = responseCode.code === 201;
    var jsonData = JSON.parse(responseBody);

    tests["Numero de solicitud generada es : "+ jsonData.result[0].numeroSolicitud] = true;


    //Valida propiedades de la API campo dentro de un array (codigoOperacion)
    pm.test("Valida propiedades de la API campo dentro de un array (codigoOperacion)", function () {
        jsonData = pm.response.json(); 
        console.log(jsonData);     
        //Valida propiedades del array "codigoOperacion"
        for (var i = 0; i < jsonData.result[i].length; i++) { 
            pm.expect(jsonData.result[i]).to.include('codigoOperacion');
        } 
    });

    //Valida propiedades de la API campo dentro de un array (numeroSolicitud)
    pm.test("Valida propiedades de la API campo dentro de un array (numeroSolicitud)", function () {
        jsonData = pm.response.json(); 
        console.log(jsonData);     
        //Valida propiedades del array "numeroSolicitud"
        for (var i = 0; i < jsonData.result[i].length; i++) { 
            pm.expect(jsonData.result[i]).to.include('numeroSolicitud');
        } 
    });

    //Valida propiedades de la API campo dentro de un array (success)
    pm.test("Valida propiedades de la API campo dentro de un array (success)", function () {
        jsonData = pm.response.json(); 
        console.log(jsonData);     
        //Valida propiedades del array "success"
        for (var i = 0; i < jsonData.result[i].length; i++) { 
            pm.expect(jsonData.result[i]).to.include('success');
        } 
    });

    //Valida propiedades de la API campo dentro de un array (tipo)
    pm.test("Valida propiedades de la API campo dentro de un array (tipo)", function () {
        jsonData = pm.response.json(); 
        console.log(jsonData);     
        //Valida propiedades del array ""
        for (var i = 0; i < jsonData.result[i].length; i++) { 
            pm.expect(jsonData.result[i]).to.include('tipo');

        } 
    });


    //Valida valor de la propiedad de la API campo dentro de un array (codigoOperacion)
    pm.test("Valida resultado de la propiedad (codigoOperacion) = 0", function () {
        jsonData = pm.response.json(); 
        for (var i = 0; i < jsonData.result[i].length; i++) { 
            pm.expect(jsonData.result[i].codigoOperacion).to.eql("0");
        } 
    
    });

    //Valida valor de la propiedad de la API campo dentro de un array (success) = true
    pm.test("Valida resultado de la propiedad (success) = True", function () {
        jsonData = pm.response.json(); 
        for (var i = 0; i < jsonData.result[i].length; i++) { 
            pm.expect(jsonData.result[i].success).to.be.true;
        } 
    
    });


    //Valida valor de la propiedad de la API campo dentro de un array (tipo) = true
    pm.test("Valida resultado de la propiedad (tipo) = INSUMO ", function () {
        jsonData = pm.response.json(); 
        for (var i = 0; i < jsonData.result[i].length; i++) { 
            pm.expect(jsonData.result[i].tipo).to.eql("INSUMO");
        } 
    
    });


}else{

    var jsonData = JSON.parse(responseBody);

     tests["Mensaje de error : "+ jsonData.error.name + " : Codigo interno del servidor: "+ responseCode.code]  = (responseBody.has(data.ResultadoName));

     tests["Mensaje de error : "+ jsonData.error.message]  = (responseBody.has(data.ResultadoMessage));


    //Valida propiedades de la API campo ('name')
    pm.test("Valida propiedades de la API campo ('name')", function () {
        jsonData = pm.response.json();      
        pm.expect(jsonData.error).to.have.a.property('name');   

    });

    //Valida propiedades de la API campo ('message')
    pm.test("Valida propiedades de la API campo ('message')", function () {
        jsonData = pm.response.json();      
        pm.expect(jsonData.error).to.have.a.property('message');   

    });


}