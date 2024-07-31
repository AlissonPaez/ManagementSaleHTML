let idProduct = "";
function loadPageProduct(){
    let localStorageProduct = localStorage.getItem("productData");;
    let productData = JSON.parse(localStorageProduct);
    idProduct = productData.id;
    document.getElementById("input-name-product").value = productData.name;
    document.getElementById("input-price-product").value = productData.price;
    document.getElementById("input-stock-product").value = productData.stock;
    document.getElementById("input-category-product").value = productData.category;
}
loadPageProduct();

function updateProduct(){
    let name = document.getElementById("input-name-product").value;
    let price = document.getElementById("input-price-product").value;
    let stock = document.getElementById("input-stock-product").value;
    let category = document.getElementById("input-category-product").value;

    let productData = {
        id: idProduct,
        name: name,
        price: price,
        stock: stock,
        category: category
    };

    let url = 'http://localhost:8080/ManagementSale/rest/ManagementProduct/updateProductAttribute';
    fetch(url, {
        method: 'PUT',
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
        alert("Se actualizó el registro.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}