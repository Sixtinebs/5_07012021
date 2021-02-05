let productIds = [];
let contact = {};

// recover element of put in basket =>localStorage
function getLocalStorage() {
    //if localStorage is empty
    let localStorageGetItem = [];
    if (window.localStorage.length === 0) {
        localStorageGetItem = [];
        return localStorageGetItem;
    } else {
        localStorageGetItem = JSON.parse(localStorage.getItem("camera"));
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
    validateFormRegex()
    
};
function validateFormRegex() {
    regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const inputEmail4 = document.getElementById('inputEmail4');
    regexPostalCode = /^[1-9]{1}[0-9]{4}$/;
    const city = document.getElementById('inputCity');
    regexName = /^[^-'][a-zA-Zàâäéèêëçùûüôö'-]+[^-']$/;
    const lastName = document.getElementById('lastName');
    const firstName = document.getElementById('firstName');
    validateForm(regexEmail, inputEmail4);
    validateForm(regexPostalCode, city);
    validateForm(regexName, lastName);
    validateForm(regexName, firstName);
}
// display element from basket
function displayBasket(camera, option) {
    const list = document.getElementById('listProducts');
    const listElements = document.createElement('li');
    listElements.innerText = camera.name + ' avec l\'option '+ option + '  ' + camera.price + '€';
    list.appendChild(listElements);
    productIds.push(camera._id);
}

function getOption() {
    let options = JSON.parse(localStorage.getItem("option"));
    console.log(options);
    for(option of options) {
        console.log(option);
    }
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
    const cameraPrice = [];
    
    const camerasFromStorage = getLocalStorage();
    
    for (let i = 0; i < camerasFromApi.length; i++) {
        for (let k = 0; k < camerasFromStorage.length; k++) {
            if (camerasFromApi[i]._id === camerasFromStorage[k].id) {
                displayBasket(camerasFromApi[i], camerasFromStorage[k].option);
                cameraPrice.push(camerasFromApi[i].price);
            }
        }
    }
    totalPrice(cameraPrice);

}
function validateForm(regex, input) {
        input.onchange = function () {  
            if((regex.test(input.value) === true)) {
                input.style.border = " 2px solid #3ed000";
                return true;
            } else {
                input.style.border = " 2px solid #dc3545 ";
                const notValide = document.createElement('p');
                const parentNode = input.parentNode;
                notValide.innerText = "\"" + input.value + "\" is not valide";
                parentNode.insertBefore(notValide, input);
                return false;
            }
        }
    }
// bool if checkbox is empty
function checkCheckboxEmpty() {
    const gridCheck = document.getElementById('gridCheck');
    if(gridCheck.checked == false) {
        gridCheck.style.border = "2px solid #dc3545";
        return false;
    } else {
        return true;
    }
}
//bool if all input is emptu
function checkInputEmpty() {
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
        const isInputEmpty = checkInputEmpty();
        const isCheckboxEmpty = checkCheckboxEmpty();
        if((isInputEmpty === true) && (isCheckboxEmpty === true)) { 
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
        let formData = {contact: contact , products: productIds};
        fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
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



