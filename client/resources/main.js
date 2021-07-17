function displayHomePage() {
    document.getElementById('shopping').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'block';
    document.getElementById('loginErrorMsg').textContent = '';
    const role = window.sessionStorage.getItem('role');
    if (role == 'Admin') {
        document.getElementById('product-form').style.display = 'block';
        document.getElementById('product-heading').style.display = 'block';
    } else {
        document.getElementById('product-form').style.display = 'none';
        document.getElementById('product-heading').style.display = 'none';
    }
    getProducts();
}

function displayLoginPage() {
    document.getElementById('shopping').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
}

window.onload = function () {
    if (sessionStorage.getItem('accessToken')) {
        displayHomePage();
    } else {
        displayLoginPage();
    }

    document.getElementById('loginBtn').onclick = async function (event) {
        event.preventDefault();
        let result = await fetch('http://localhost:3000/authorize', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        }).then(response => response.json());
        if (result.accessToken) {
            window.sessionStorage.setItem('accessToken', result.accessToken);
            window.sessionStorage.setItem('role', result.role);
            window.sessionStorage.setItem('userName', result.userName)
            displayHomePage();
        } else {
            document.getElementById('loginErrorMsg').textContent = result.error;
        }
    }

    document.getElementById('logoutBtn').onclick = function (event) {
        sessionStorage.removeItem('accessToken');
        location.reload();
    }

    // add/update product
    document.getElementById('product-btn').onclick = function (event) {
        event.preventDefault();
        if (!document.getElementById('product-btn').dataset.id) {
<<<<<<< HEAD
            console.log("Awaab");
=======
            // console.log("Awaab");
>>>>>>> 8fd425a (Upload)
            addProduct();
        } else {
            editProduct();
        }
    }

}

async function getProducts() {
    let products = await fetch('http://localhost:3000/books/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        }
    }).then(response => response.json());
    products.data.forEach(prod => {
        if (prod.id !== '') {
            // console.log(prod.id);
            renderProduct(prod);
        }


    });
}

function renderProduct(prod) {
    const div = document.createElement('div');
    div.classList = 'col-lg-2';
<<<<<<< HEAD
    // console.log(prod.id);
    div.id = prod.id;
    // div.innerHTML = `<svg class="bd-placeholder-img rounded-circle" 
    // width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" 
    // aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" 
    // focusable="false">
    // <title>Placeholder</title>
    // <rect width="100%" height="100%" fill="#777">
    // </rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
    // </svg>`;
=======
    div.id = prod.id;
>>>>>>> 8fd425a (Upload)

    const h2 = document.createElement('h2');
    h2.textContent = prod.name;

    const price = document.createElement('p');
    price.textContent = prod.price;
<<<<<<< HEAD

    // const publishedDate = document.createElement('p');
    // publishedDate.textContent = prod.publishedDate;

    // const author = document.createElement('p');
    // author.textContent = prod.author;

    div.appendChild(h2);
    div.appendChild(price);
    // div.appendChild(publishedDate);
    // div.appendChild(author);
=======

    div.appendChild(h2);
    div.appendChild(price);
>>>>>>> 8fd425a (Upload)

    const actions = document.createElement('p');
    const addBtn = document.createElement('a');
    addBtn.classList = 'btn btn-secondary';
    addBtn.textContent = 'addToCart';
    addBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const userName = sessionStorage.getItem('userName');
        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify({ 
                id: prod.id,
                name: prod.name,
                price: prod.price
            })
        }).then(response => {
            response.json().then(data => {
                document.getElementById('alert').innerHTML = data.message;
            });
            div.remove();
            document.getElementById('product-form').reset();
        });
        getCart();
        // document.getElementById('title').value = prod.name;
        // document.getElementById('price').value = prod.price;
    });

    const updateBtn = document.createElement('a');
    updateBtn.classList = 'btn btn-secondary';
    updateBtn.textContent = 'UPDATE';
    updateBtn.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('product-heading').textContent = 'Edit Book';
        document.getElementById('title').value = prod.name;
        document.getElementById('price').value = prod.price;
<<<<<<< HEAD
        // document.getElementById('publishedDate').value = prod.publishedDate;
        // document.getElementById('author').value = prod.author;
        // document.getElementById('product-btn').dataset.id = prod.id;
=======
>>>>>>> 8fd425a (Upload)
    });

    const deleteBtn = document.createElement('a');
    deleteBtn.classList = 'btn btn-secondary';
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click',  function (event) {
        event.preventDefault();
        fetch('http://localhost:3000/books', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify({ id: prod.id })
        }).then(response => {
<<<<<<< HEAD
            // alert('Delete Successfully!');
            response.json().then(data => {
                console.log(data.message);
=======
            response.json().then(data => {
>>>>>>> 8fd425a (Upload)
                document.getElementById('alert').innerHTML = data.message;
            });

            div.remove();
            document.getElementById('product-form').reset();
        });
    });

    actions.appendChild(addBtn);
    actions.appendChild(updateBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(actions);

    document.getElementById('products').appendChild(div);
}

async function getCart() {
    let result = await fetch('http://localhost:3000/cart/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        }
    }).then(response => response.json());
    let elements = "<table>";
    result.data.forEach(book => {
        // console.log(window.sessionStorage.userName);
        let row = "<tr>"
            + "<td>" + book.userName + "</td>"
            + "<td>" + book.book.id + "</td>"
            + "<td>" + book.book.name + "</td>"
            + "<td>" + book.book.price + "</td>"
            + "</tr>"
        elements += row;
    });
    elements += "</table>";
    document.getElementById('divCart').innerHTML = elements;

    document.getElementById('product-form').reset();

    // renderProduct(result);
}

async function addProduct() {
    let result =  await fetch('http://localhost:3000/books/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            id: document.getElementById('id').value,
            name: document.getElementById('title').value,
            price: document.getElementById('price').value,
<<<<<<< HEAD
            // publishedDate: document.getElementById('publishedDate').value,
            // author: document.getElementById('author').value
        })
    }).then(response => {
        response.json().then(data => {
            console.log(data.message);
=======
        })
    }).then(response => {
        response.json().then(data => {
            // console.log(data.message);
>>>>>>> 8fd425a (Upload)
            document.getElementById('alert').innerHTML = data.message;
        });
        document.getElementById('product-form').reset();
    });
    renderProduct(result);
}

function editProduct() {
    const prodId = document.getElementById('product-btn').dataset.id;
    document.getElementById('id').value = prodId;
<<<<<<< HEAD
    console.log("prodId");
    const name = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    // const publishedDate = document.getElementById('publishedDate').value;
    // const author = document.getElementById('author').value;
=======
    // console.log("prodId");
    const name = document.getElementById('title').value;
    const price = document.getElementById('price').value;
>>>>>>> 8fd425a (Upload)
    fetch('http://localhost:3000/books/', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            id: prodId,
            name: name,
            price: price
<<<<<<< HEAD
            // publishedDate: publishedDate,
            // author: author
        })
    }).then(response => response.json())
        .then(jsonObj => {
            jsonObj.json().then(data => console.log(data));
=======
        })
    }).then(response => response.json())
        .then(jsonObj => {
            jsonObj.json().then(
                // data => console.log(data)
            );
>>>>>>> 8fd425a (Upload)
            const productDiv = document.getElementById(prodId);
            productDiv.querySelector('h2').textContent = name;
            const paragraphArr = productDiv.querySelectorAll('p');
            paragraphArr[0].textContent = name;
            paragraphArr[1].textContent = price;
            document.getElementById('product-heading').textContent = 'Add a new Book';
            document.getElementById('product-btn').dataset.id = '';
            document.getElementById('product-form').reset();
        });
}