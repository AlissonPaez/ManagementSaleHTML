function addProduct(){
    let id = document.getElementById("input-id-product").value;
    let name = document.getElementById("input-name-product").value;
    let price = document.getElementById("input-price-product").value;
    let stock = document.getElementById("input-stock-product").value;
    let category= document.getElementById("input-category-product").value;

    let productData = {
        id: id,
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
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert("Se agregó el registro.");
            window.location.href = "./dashboard.html";
        } else {
            document.getElementById('error-message').innerText = 'La venta no se pudo añadir, revise todos los campos.';
            document.getElementById('error-message').style.display = 'block';
        }
    })
    .catch(error => {
        document.getElementById('error-message').innerText = 'Error en la operación: ' + error.message;
        document.getElementById('error-message').style.display = 'block';
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}