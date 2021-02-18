// recover param of url
function getId() {
    let urlcourante = document.location.href;
    const searchParams = new URLSearchParams(urlcourante);
    for (let p of searchParams) {
        return p[1];
    }
}
// create input for choose option cameras
function chooseOptionsCameras(options) {
    const newDiv = document.createElement('div');
    const newSelect = document.createElement('select');
    newSelect.setAttribute("name", "options");
    newSelect.id = "select";
    newSelect.classList = "form-select";
    newSelect.attributes= 'aria-label', 'Select option for camera';
    const btnPageBasket = document.getElementById('btnPageBasket');
    const card = document.getElementsByClassName("card-body")[0];
    for (option of options) {
        const newOption = document.createElement('option');
        newOption.setAttribute("value", option);
        let contenu = document.createTextNode(option);
        newDiv.appendChild(newSelect);
        newDiv.id = "selectOption";
        newSelect.appendChild(newOption);
        newOption.appendChild(contenu);

        card.insertBefore(newDiv, btnPageBasket);
    }
}
//stock camera select => localStorage
function setElementStorage(param) {
    const btnAddBasket = document.createElement('a');
    const card = document.getElementsByClassName("card-body")[0];
    btnAddBasket.attributes = "role", "button";
    btnAddBasket.classList = "btn btn-orinoco";
    btnAddBasket.id ="btn-shop";
    btnAddBasket.innerHTML = "Ajouter au panier";
    //btnAddBasket.innerHTML = '<i class="fas fa-shopping-cart"></i>'
    
    btnAddBasket.addEventListener('click', function () {
        const optionValue = document.getElementById('select').value;
        let camera = JSON.parse(localStorage.getItem("camera"));
        if(camera === null) {
            camera = [];
        }
        camera.push({
            'id': param,
            'option': optionValue
        })
        localStorage.setItem('camera', JSON.stringify(camera));
    })
    card.appendChild(btnAddBasket);
}
function createHtmlCardProduct(element) {
    const yourProduct = document.getElementById('yourProduct');
    const card = document.createElement('div');
    card.classList =  "card";
    yourProduct.appendChild(card);
    
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
    cardPrice.innerText = element.price/100 + '€';
    cardBody.appendChild(cardPrice);
    
    const btn = document.createElement('a');
    btn.classList = "btn btn-outline-orinoco btn-product";
    btn.href = "basket.html";
    btn.attributes = "role", "button";
    btn.id = "btnPageBasket"
    btn.innerText = "Voir le panier";
    cardBody.appendChild(btn);
}
function pageMoreInfo(data) {
    const param = getId();
    createHtmlCardProduct(data) 
    chooseOptionsCameras(data.lenses);
    setElementStorage(param);
}

getApi('http://localhost:3000/api/cameras/'+ getId()).then(response => {
    pageMoreInfo(response);
}).catch(error => {
    console.log(error)
});



