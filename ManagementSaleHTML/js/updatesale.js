let codeSale = "";
function loadPageSale(){
    let localStorageSale = localStorage.getItem("saleData");;
    let saleData = JSON.parse(localStorageSale);
    codeSale = saleData.code;
    document.getElementById("input-date-sale").value = saleData.date;
    document.getElementById("input-number-products-sold").value = saleData.numberProductsSold;
    document.getElementById("input-payment-method").value = saleData.paymentMethod;
    document.getElementById("input-sale-status").value = saleData.saleStatus;
    document.getElementById("input-total-sale").value = saleData.totalSale;
    document.getElementById("input-code-product").value = saleData.codeProduct;
}
loadPageSale();

function updateSale(){
    let date = document.getElementById("input-date-sale").value;
    let numberProductsSold = document.getElementById("input-number-products-sold").value;
    let paymentMethod = document.getElementById("input-payment-method").value;
    let saleStatus = document.getElementById("input-sale-status").value;
    let totalSale = document.getElementById("input-total-sale").value;
    let codeProduct= document.getElementById("input-code-product").value;

    let saleData = {
        code: codeSale,
        date: date,
        numberProductsSold: numberProductsSold,
        paymentMethod: paymentMethod,
        saleStatus: saleStatus,
        totalSale: totalSale,
        codeProduct: codeProduct
    };

    let url = 'http://localhost:8080/ManagementSale/rest/ManagementSale/updateSaleAttribute';
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
        document.getElementById('error-message').innerText = 'La venta no se pudo actualizar ya que el código del producto no existe.';
        document.getElementById('error-message').style.display = 'block';
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}