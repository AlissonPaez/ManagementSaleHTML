function validateUser(){
    let nameUser = document.getElementById("txt-name-user").value;
    let password = document.getElementById("txt-password").value;

    /* Propiedad para redirigir */
    //window.location.href = "nueva_pagina.html";

    fetch('http://localhost:8080/ManagementSale/rest/ManagementUser/validateUser?nameUser=' +nameUser +'&password='+password)
.then(response => response.json())
.then(data => {
    console.log(data); // Añade esto para ver la respuesta del servidor
    if (data === true) {
        window.location.href = "./dashboard.html";
    } else {
        alert("Credenciales inválidas");
    }
})
.catch(error => console.error('Error:', error));
}