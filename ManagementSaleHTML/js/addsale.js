function addSale(){
    let code = document.getElementById("input-code-sale").value;
    let date = document.getElementById("input-date-sale").value;
    let numberProductsSold = document.getElementById("input-number-products-sold").value;
    let paymentMethod = document.getElementById("input-payment-method").value;
    let saleStatus= document.getElementById("input-sale-status").value;
    let totalSale = document.getElementById("input-total-sale").value;
    let codeProduct = document.getElementById("input-code-product").value;

    let saleData = {
        code: code,
        date: date,
        numberProductsSold: numberProductsSold,
        paymentMethod: paymentMethod,
        yearPublish: yearPublish,
        saleStatus: saleStatus,
        totalSale: totalSale,
        codeProduct: codeProduct
    };

    let url = 'http://localhost:8080/ManagementSale/rest/ManagementSale/createSale';
    fetch(url, {
        method: 'POST',
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
        alert("Se agregó el registro.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}