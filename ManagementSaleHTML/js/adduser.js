function addUser(){
    let nameUser = document.getElementById("input-name-user").value;
    let password = document.getElementById("input-password").value;
    

    let userData = {
        nameUser: nameUser,
        password: password,
        
    };

    let url = 'http://localhost:8080/ManagementSale/rest/ManagementUser/createUser';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se agregó el registro.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}