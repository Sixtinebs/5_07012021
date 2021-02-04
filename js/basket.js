const cameraPrice = [];
let products = localStorage.getItem("id");
let contact = {};

// recover element of put in basket =>localStorage
function getLocalStorage() {
    //if localStorage is empty
    let localStorageGetItem = [];
    if (window.localStorage.length === 0) {
        localStorageGetItem = [];
        return localStorageGetItem;
    } else {
        localStorageGetItem = JSON.parse(products);
        return localStorageGetItem;
    }
}
// bouton pour valider le panier et passer la commande => afficher le formulaire
function displayForm() {
    const btnValideBasket = document.createElement('btn');
    btnValideBasket.classList = "btn btn-primary";
    btnValideBasket.innerText = "valider la commande";
    const listBasket = document.getElementById('list-basket');
    listBasket.appendChild(btnValideBasket);
    const formOrder = document.getElementById('form-order');
    btnValideBasket.addEventListener('click', function () {
        formOrder.style.display = 'block';
    })
};

// display element from basket
function displayBasket(camera) {
    cameraPrice.push(camera.price);
    const list = document.getElementById('listProducts');
    const listElements = document.createElement('li');
    listElements.innerText = camera.name + ' ' + camera.price + '€';
    list.appendChild(listElements);

}

function totalPrice(listPrices) {
    let total = 0;
    for (let i = 0; i < listPrices.length; i++) {
        total += listPrices[i];
    }
    const newP = document.createElement('p');
    newP.innerText = 'Total ' + total + '€';
    document.getElementById('listProducts').appendChild(newP);
}


//Compare Api and localStorage for find good element in basket
function findCameras(camerasFromApi) {
    const camerasFromStorage = getLocalStorage();
    for (let i = 0; i < camerasFromApi.length; i++) {
        for (let k = 0; k < camerasFromStorage.length; k++) {
            if (camerasFromApi[i]._id === camerasFromStorage[k]) {
                displayBasket(camerasFromApi[i]);
            }
        }
    }
    totalPrice(cameraPrice);
    //displayForm(); 
}
function validateEmail() {
    regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const inputEmail4 = document.getElementById('inputEmail4');
    inputEmail4.onchange = function () {
        if (regexEmail.test(inputEmail4.value) === true && (!inputEmail4.value == "")) {
            inputEmail4.style.border = " 2px solid #3ed000";
            return true;
        } else {
            inputEmail4.style.border = " 2px solid #dc3545 ";
            const notValide = document.createElement('p');
            const parentNode = inputEmail4.parentNode;
            notValide.innerText = "Your address email is not valide";
            parentNode.insertBefore(notValide, inputEmail4);
            return false;
        }
    }

}
//validateEmail();
function checkboxEmpty() {
    const gridCheck = document.getElementById('gridCheck');
    if(gridCheck.checked == false) {
        gridCheck.style.border = "2px solid #dc3545";
        return false;
    } else {
        return true;
    }
}
function inputEmpty() {
    let inputEmpty = true;
    const inputs = document.querySelectorAll('.form-control');
        for (input of inputs) {
            if (input.value == "") {
                input.style.border = "2px solid #dc3545";
                inputEmpty =  false;
            } else  {
                input.style.border = "2px solid #3ed000";
                getFormField(input.name, input.value);
            }
        }
        if(inputEmpty === false ) {
            return false;
        } else {
            return true
            
        }     
}

function submitForm() {
    const btnSubmit = document.getElementById('btn-submit');
    btnSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        const input = inputEmpty();
        const checkbox = checkboxEmpty();
        sendPost(input, checkbox);
        console.log(input);
        console.log(checkbox);

    })
}

function getFormField(name, value) {
    contact[name] = value;
}


// récuperer la réponse
// Renvoie sur la page de confirmation avec un mot + id de réponse
// ajouter un bouton +/- aux articles
//créer une page si aucun article dans le panier
// finir la validation du formulaire


//function main
(function() {
    submitForm();
    getApi('http://localhost:3000/api/cameras/', findCameras);
})();

function sendPost(input, checkbox) {
    let formData = {contact, products};
    console.log(formData);
    fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers : {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.catch((error) => alert("Erreur : " + error))
}


/*
function postApi(body) {
    const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                const response = JSON.parse(this.responseText);
                console.log(response);
            } else {
                console.log('je passe par la');
            }
        };
        request.open("POST", "http://localhost:3000/api/cameras/order");
        // for more information
        request.setRequestHeader("Content-Type", "application/json");
        // send json -> service web
        request.send(JSON.stringify(body));
}
*/
