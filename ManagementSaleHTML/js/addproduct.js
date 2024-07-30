function addProduct(){
    let code = document.getElementById("input-code-product").value;
    let name = document.getElementById("input-name-product").value;
    let price = document.getElementById("input-price-product").value;
    let stock = document.getElementById("input-stock-product").value;
    let category= document.getElementById("input-category-product").value;

    let productData = {
        code: code,
        name: name,
        price: price,
        stock: stock,
        category: category
    };

    let url = 'http://localhost:8080/ManagementSale/rest/ManagementProduct/createProduct';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
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