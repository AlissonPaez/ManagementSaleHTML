function validateUser(){
    let userName = document.getElementById("txt-name-user").value;
    let password = document.getElementById("txt-password").value;

    /* Propiedad para redirigir */
    //window.location.href = "nueva_pagina.html";

    fetch('http://localhost:8080/ManagementSale/ManagementSale/rest/ManagementUser/validateUser?nameUser=' +userName +'&password='+password)
    .then(response => response.json())
    .then(data => {
        window.location.href = "./dashboard.html";
    })
    .catch(error => console.error('Error:', error));

}