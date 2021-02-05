const cameraPrice = [];
let product_id = [];
//let cameras = [];
let contact = {};

// recover element of put in basket =>localStorage
function getLocalStorage() {
    //if localStorage is empty
    let localStorageGetItem = [];
    if (window.localStorage.length === 0) {
        localStorageGetItem = [];
        return localStorageGetItem;
    } else {
        localStorageGetItem = JSON.parse(localStorage.getItem("id"));
        //findCameras()
        displayForm();
        return localStorageGetItem;
    }
}
//bouton for validate the basket and pass the order => display form 
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
    validateEmail();
};

// display element from basket
function displayBasket(camera) {
    cameraPrice.push(camera.price);
    const list = document.getElementById('listProducts');
    const listElements = document.createElement('li');
    listElements.innerText = camera.name + ' ' + camera.price + '€';
    list.appendChild(listElements);
    product_id.push(camera._id);
}
// calcute the price total
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
    console.log(camerasFromApi);
    const camerasFromStorage = getLocalStorage();
    for (let i = 0; i < camerasFromApi.length; i++) {
        for (let k = 0; k < camerasFromStorage.length; k++) {
            if (camerasFromApi[i]._id === camerasFromStorage[k]) {
                displayBasket(camerasFromApi[i]);
            }
        }
    }
    totalPrice(cameraPrice);

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
// bool if checkbox is empty
function checkboxEmpty() {
    const gridCheck = document.getElementById('gridCheck');
    if(gridCheck.checked == false) {
        gridCheck.style.border = "2px solid #dc3545";
        return false;
    } else {
        return true;
    }
}
//bool if all input is emptu
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
        if((input === true) && (checkbox === true)) { 
            sendPost();
        }
    })
}

function getFormField(name, value) {
    contact[name] = value;
}

//function main
(function() {
    submitForm();
    getApi('http://localhost:3000/api/cameras/', findCameras);
})();

function sendPost() {
        let formData = {contact : contact , products : product_id};
        fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers : {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
        localStorage.setItem('order_id', response.orderId);
        window.location.href = "confirmation.html";
    })
    .catch((error) => alert("Erreur : " + error))
    }



