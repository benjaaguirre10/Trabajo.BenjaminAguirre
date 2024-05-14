const socketClient = io()


const product = document.getElementById("products")

socketClient.on('saludoDesdeBack', (message) =>{
    console.log(message);
})

socketClient.on("getProducts", (products) =>{
    let infoProducts = '';
    products.forEach((prod) => {
        infoProducts += `${prod.title} - ${prod.description}  - $${prod.price} - $${prod.code} - $${prod.stock}
        </br>`;
    });
    product.innerHTML = infoProducts;
});

