document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.nav-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.getElementById('button-products').addEventListener('click', function (event) {
    event.preventDefault(); /* Evita el comportamiento predeterminado */
    loadProducts();

});

document.getElementById('button-sales').addEventListener('click', function (event) {
    event.preventDefault(); /* Evita el comportamiento predeterminado */
    loadSales();


});

document.getElementById('button-users').addEventListener('click', function (event) {
    event.preventDefault(); /* Evita el comportamiento predeterminado */
    loadUsers();

});


function loadProducts(){
    
    const content = document.getElementById('content');

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card card-product';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addproduct.html';

    const imgAdd = document.createElement('img'); 
    imgAdd.src = 'resource/icons/add-product.png';

    imgAdd.style.width = '40px'; // Ajuste a 40 píxeles
    imgAdd.style.height = '40px'; // Ajuste a 40 píxeles

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Bienvenido a la sección de productos! Haz clic en el ícono para agregar un nuevo producto.';

    /** Se agrega el ícono el botón */
    btnAdd.appendChild(imgAdd);

    /** Se agrega botón y título al cuerpo de la carta */
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);

    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);
    
    fetch('http://localhost:8080/ManagementSale/rest/ManagementProduct/getProducts')
    .then(response => response.json())
    .then((data) => {
        const content = document.getElementById('content');
        data.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card card-product';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            /** Se hace la creación de cada componente */
            /** Creamos la sección de título */
            const title = document.createElement('h2');
            title.className = 'card-title';
            title.textContent = product.name;
            
            /** Creamos la sección de Id */
            const id = document.createElement('p');
            id.className = 'card-text';
            id.innerHTML = `<strong>Código:</strong> ${product.id}`;

            /** Creamos la sección de Precio */
            const price = document.createElement('p');
            price.className = 'card-text';
            price.innerHTML = `<strong>Precio:</strong> ${product.price}`;

            /** Creamos la sección de la Stock */
            const stock = document.createElement('p');
            stock.className = 'card-text';
            stock.innerHTML = `<strong>Stock:</strong> ${product.stock}`;

            /** Sección de la cantidad de la Categoria */
            const category = document.createElement('p');
            category.className = 'card-text';
            category.innerHTML  = `<strong>Categoria:</strong> ${product.category}`;


            /* Creación de botones de eliminar */
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.id = `btn-delete-${product.id}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-code', product.id);

            // Agregar event listener al botón
            btnEliminar.addEventListener('click', function() {
                const productId = this.getAttribute('data-code');
                deleteProductById(productId);
            });

            /* Creación del botón de actualizar */
            const btnActualizar = document.createElement('a');
            btnActualizar.className = 'btn-success margin';
            btnActualizar.id = `btn-delete-${product.code}`;
            btnActualizar.textContent = `Actualizar`;

            // Agregar event listener al botón
            btnActualizar.addEventListener('click', function() {
                localStorage.setItem("productData", JSON.stringify(product));
                window.location.href = "./updateproduct.html";
            });

            

            /** Agregamos los componentes al body */
            cardBody.appendChild(title);
            cardBody.appendChild(id);
            cardBody.appendChild(price);
            cardBody.appendChild(stock);
            cardBody.appendChild(category);

            /* Agregamos el botón eliminar */
            cardBody.appendChild(btnEliminar);

            /* Agregamos el botón eliminar */
            cardBody.appendChild(btnActualizar);

            /** Agregamos el body al card */
            card.appendChild(cardBody);

            /** Agregamos el card al content */
            content.appendChild(card);
        })
    })
    .catch(error => console.error('Error:', error));
}


function cleanContent(){
    const content = document.getElementById('content');
    content.innerHTML = "";
}

function deleteProductById(code){
    let url = 'http://localhost:8080/ManagementSale/rest/ManagementProduct/deleteProduct?codeProduct='+code;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se eliminó el registro");
        cleanContent();
        loadProducts();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}


function loadUsers(){
    const content = document.getElementById('content');

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card card-user';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './adduser.html';

    const imgAdd = document.createElement('img'); 
    imgAdd.src = 'resource/icons/add-user.png';

    imgAdd.style.width = '40px'; // Ajuste a 40 píxeles
    imgAdd.style.height = '40px'; 


    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Bienvenido a la sección de usuarios! Haz clic en el ícono para agregar un nuevo usuario.';

    /** Se agrega el ícono el botón */
    btnAdd.appendChild(imgAdd);

    /** Se agrega botón y título al cuerpo de la carta */
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);

    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);
    
    fetch('http://localhost:8080/ManagementSale/rest/ManagementUser/getUser')
    .then(response => response.json())
    .then((data) => {
        const content = document.getElementById('content');
        data.forEach(user => {
            const card = document.createElement('div');
            card.className = 'card card-user';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            /** Se hace la creación de cada componente */
            /** Creamos la sección de título */
            const userName = document.createElement('h2');
            userName.className = 'card-title';
            userName.textContent = user.nameUser;
            
            /** Creamos la sección de Contraseña */
            const password = document.createElement('p');
            password .className = 'card-text';
            password .innerHTML = `<strong>Contraseña:</strong> ${user.password }`;
            

            /* Creación de botones de eliminar */
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.id = `btn-delete-${user.nameUser}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-code', user.nameUser);

            // Agregar event listener al botón
            btnEliminar.addEventListener('click', function() {
                const nameUser = this.getAttribute('data-code');
                deleteUser(nameUser);
            });

            /** Agregamos los componentes al body */
            cardBody.appendChild(userName);
            cardBody.appendChild(password);

            /* Agregamos el botón eliminar */
            cardBody.appendChild(btnEliminar);

            /** Agregamos el body al card */
            card.appendChild(cardBody);

            /** Agregamos el card al content */
            content.appendChild(card);
        })
    })
    .catch(error => console.error('Error:', error));
}

function deleteUser(nameUser){
    let url = 'http://localhost:8080/ManagementSale/rest/ManagementUser/deleteUser?nameUser='+nameUser;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se eliminó el registro");
        cleanContent();
        loadUsers();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}



function loadSales(){
    const content = document.getElementById('content');

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card card-sale';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addsale.html';

    const imgAdd = document.createElement('img'); 
    imgAdd.src = 'resource/icons/add-sale.png';

    imgAdd.style.width = '40px'; // Ajuste a 40 píxeles
    imgAdd.style.height = '40px'; 


    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Bienvenido a la sección de ventas! Haz clic en el ícono para agregar una nueva venta.';

    /** Se agrega el ícono el botón */
    btnAdd.appendChild(imgAdd);

    /** Se agrega botón y título al cuerpo de la carta */
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);

    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);
    
    fetch('http://localhost:8080/ManagementSale/rest/ManagementSale/getSales')
    .then(response => response.json())
    .then((data) => {
        const content = document.getElementById('content');
        data.forEach(sale => {
            const card = document.createElement('div');
            card.className = 'card card-sale';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            /** Se hace la creación de cada componente */
            /** Creamos la sección de título */
            const title = document.createElement('h2');
            title.className = 'card-title';
            title.textContent = sale.code;
            
            /** Creamos la sección de la fecha */
            const date = document.createElement('p');
            date.className = 'card-text';
            date.innerHTML = `<strong>Fecha:</strong>  ${sale.date}`;

            /** Creamos la sección de los productos vendidos */
            const numberProductsSold = document.createElement('p');
            numberProductsSold.className = 'card-text';
            numberProductsSold.innerHTML = `<strong>Numero de productos vendidos:</strong> ${sale.numberProductsSold}`;

            /** Creamos la sección de metodo de pago */
            const paymentMethod = document.createElement('p');
            paymentMethod.className = 'card-text';
            paymentMethod.innerHTML = `<strong>Metodo de Pago:</strong> ${sale.paymentMethod}`;

            /** Sección del estado de la venta */
            const saleStatus = document.createElement('p');
            saleStatus.className = 'card-text';
            saleStatus.innerHTML = `<strong>Estado de la Venta:</strong> ${sale.saleStatus}`;

            /** Sección del total de la venta */
            const totalSale = document.createElement('p');
            totalSale.className = 'card-text';
            totalSale.innerHTML = `<strong>Total de la Venta:</strong> ${sale.totalSale}`;

            /** Sección del código del producto */
            const codeProduct = document.createElement('p');
            codeProduct.className = 'card-text';
            codeProduct.innerHTML = `<strong>Código del Producto:</strong> ${sale.codeProduct}`;


            /* Creación de botones de eliminar */
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.code = `btn-delete-${sale.code}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-code', sale.code);

            // Agregar event listener al botón
            btnEliminar.addEventListener('click', function() {
                const saleCode = this.getAttribute('data-code');
                deleteSaleById(saleCode);
            });

            /* Creación del botón de actualizar */
            const btnActualizar = document.createElement('a');
            btnActualizar.className = 'btn-success margin';
            btnActualizar.id = `btn-delete-${sale.code}`;
            btnActualizar.textContent = `Actualizar`;

            // Agregar event listener al botón
            btnActualizar.addEventListener('click', function() {
                localStorage.setItem("saleData", JSON.stringify(sale));
                window.location.href = "./updatesale.html";
            });

            /** Agregamos los componentes al body */
            cardBody.appendChild(title);
            cardBody.appendChild(date);
            cardBody.appendChild(numberProductsSold);
            cardBody.appendChild(paymentMethod);
            cardBody.appendChild(saleStatus);
            cardBody.appendChild(totalSale);
            cardBody.appendChild(codeProduct);

            /* Agregamos el botón eliminar */
            cardBody.appendChild(btnEliminar);

            /* Agregamos el botón eliminar */
            cardBody.appendChild(btnActualizar);

            /** Agregamos el body al card */
            card.appendChild(cardBody);

            /** Agregamos el card al content */
            content.appendChild(card);
        })
    })
    .catch(error => console.error('Error:', error));
}


function deleteSaleById(code){
    let url = 'http://localhost:8080/ManagementSale/rest/ManagementSale/deleteSale?codeSale='+code;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se eliminó el registro");
        cleanContent();
        loadSales();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}

