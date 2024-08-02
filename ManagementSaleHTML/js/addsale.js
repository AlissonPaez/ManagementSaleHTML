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
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
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