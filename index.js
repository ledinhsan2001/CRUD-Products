// import fetch from "node-fetch";


var listProducts = document.querySelector('#list-product')

var productApi = 'http://localhost:3000/products';

function start(){
    getProducts(function(products) {
        renderProducts(products);
    });
    handle();
}

start()


function getProducts(callback) {
    fetch(productApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}   


function createProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)//Chuyen type JS -> JSON chain
    };
    //sau khi new create will response main data new create
    fetch(productApi, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}


function deleteProduct(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    //sau khi new create will response main data new create
    fetch(productApi + '/'+id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            // getProducts(renderProducts); c1, c2:xoa elementnode tren DOM
            var elementDelete = document.querySelector('.item-'+id);
            elementDelete.remove();
        });
}
function renderProducts(products) {
    var listProducts = 
        document.querySelector('#list-product');
    var htmls = products.map(function(product) {
        return `
        <div class="item-${product.id}">
            <h3>ID:${product.id}</h3>
            <p><b>Title</b>:${product.title}</p>
            <ul>
                <li>${product.price}</li>
                <li>${product.category}</li>
                <img src="${product.image}" width=80px>
            </ul>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </div>
        `;
    })
    listProducts.innerHTML = htmls.join('');
}

function handle() {
    var btnCreate = document.querySelector('#btnCreate')
    btnCreate.onclick = function() {
        var title = document.querySelector('input[name="title"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var category = document.querySelector('input[name="category"]').value;
        var img = document.querySelector('input[name="img"]').value;
        var formData = {
            title: title,
            price: price,
            category: category,
            img: img,
        };

        createProduct(formData);
    }
}