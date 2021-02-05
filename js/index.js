function createHtmlCard(element) {
    const card = document.createElement('div');
    card.classList =  "card";
    products.appendChild(card);
    
    const row = document.createElement('div');
    row.classList = "row g-0";
    card.appendChild(row);

    const col = document.createElement('div');
    col.classList = "col-md-4";
    row.appendChild(col);

    const img = document.createElement('img');
    img.style.width = "100%";
    img.src = element.imageUrl;
    col.appendChild(img);

    const col2 = document.createElement('div');
    col2.classList = "col-md-8";
    row.appendChild(col2);

    const cardBody = document.createElement('div');
    cardBody.classList = "card-body";
    col2.appendChild(cardBody);

    const titleName = document.createElement('h5');
    titleName.classList = "card-title";
    titleName.innerText = element.name;
    cardBody.appendChild(titleName);

    const cardText = document.createElement('p');
    cardText.classList = "card-text";
    cardText.innerText = element.description;
    cardBody.appendChild(cardText);

    const cardPrice = document.createElement('p');
    cardPrice.classList = "card-price";
    cardPrice.innerText = element.price + '€';
    cardBody.appendChild(cardPrice);
    
    const btn = document.createElement('a');
    btn.classList = "btn btn-outline-orinoco btn-product";
    btn.href = "pages/product.html?id=" + element._id;
    btn.attributes = "role", "button";
    btn.innerText = "Voir plus";
    cardBody.appendChild(btn);
}

function displayListProducts(response) {
    for(let i in response) {
        createHtmlCard(response[i])  
    } 
}


getApi("http://localhost:3000/api/cameras", displayListProducts);


