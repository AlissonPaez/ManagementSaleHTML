let codeProduct = "";
function loadPageProduct(){
    let localStorageProduct = localStorage.getItem("productData");;
    let productData = JSON.parse(localStorageProduct);
    codeSale = productData.code;
    document.getElementById("input-name-product").value = saleData.name;
    document.getElementById("input-price-product").value = saleData.price;
    document.getElementById("input-stock-product").value = saleData.stock;
    document.getElementById("input-category-product").value = saleData.category;
}
loadPageProduct();

function updateProduct(){
    let name = document.getElementById("input-name-product").value;
    let price = document.getElementById("input-price-product").value;
    let stock = document.getElementById("input-stock-product").value;
    let category = document.getElementById("input-category-product").value;

    let productData = {
        code: codeProduct,
        name: name,
        price: price,
        stock: stock,
        category: category
    };

    let url = 'http://localhost:8080/Library/rest/ManagementLibrary/updateBookAttribute';
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
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