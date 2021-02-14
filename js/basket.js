let productIds = [];
let contact = {};
//Compare Api and localStorage for find good element in basket
function findCameras(camerasFromApi) {
    const cameraPrice = [];
    const camerasFromStorage = getLocalStorage();
    
    for (let i = 0; i < camerasFromApi.length; i++) {
        for (let k = 0; k < camerasFromStorage.length; k++) {
            if (camerasFromApi[i]._id === camerasFromStorage[k].id) {
                priceEuro = camerasFromApi[i].price / 100;
                displayBasket(priceEuro, camerasFromApi[i], camerasFromStorage[k].option);
                cameraPrice.push(priceEuro);
            }
        }
    }
    totalPrice(cameraPrice);

}
// calcute the price total
function totalPrice(listPrices) {
    let total = 0;
    for (let i = 0; i < listPrices.length; i++) {
        total += listPrices[i];
    }
    const newP = document.createElement('p');
    newP.id = 'total-price';
    newP.innerText = 'Total ' + total + '€';
    document.getElementById('listProducts').after(newP);
}


// recover element of put in basket =>localStorage
function getLocalStorage() {
    //if localStorage is empty
    let localStorageGetItem = [];
    if (window.localStorage.length === 0) {
        localStorageGetItem = [];
        return localStorageGetItem;
    } else {
        localStorageGetItem = JSON.parse(localStorage.getItem("camera"));
        displayForm();
        return localStorageGetItem;
    }
}
//bouton for validate the basket and pass the order => display form 
function displayForm() {
    const btnValideBasket = document.createElement('button');
    btnValideBasket.classList = "btn btn-orinoco";
    btnValideBasket.innerText = "Valider la commande";
    const listBasket = document.getElementById('list-basket');
    listBasket.appendChild(btnValideBasket);
    const formOrder = document.getElementById('form-order');
    btnValideBasket.addEventListener('click', function () {
        formOrder.style.display = 'block';
        validateFormRegex(); 
        btnValideBasket.style.display = 'none'; 
    })
    
    
};
// display element from basket
function displayBasket(price, camera, option) {
    const list = document.querySelector('#listProducts tbody');
    const listElements = document.createElement('tr');
    list.appendChild(listElements);
    listElements.innerHTML = '<td>' + camera.name + '</td>';
    listElements.innerHTML += ' <td>' + option + '</td>'; 
    listElements.innerHTML += ' <td>' + price + '€ </td>';    
    productIds.push(camera._id);
}

function getOption() {
    let options = JSON.parse(localStorage.getItem("option"));
    for(option of options) {
    }
}

let isvalidateForm = 0;
function validateFormRegex() {
    regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const inputEmail4 = document.getElementById('inputEmail4');
    regexPostalCode = /^[1-9]{1}[0-9]{4}$/;
    const city = document.getElementById('inputCity');
    regexName = /^[^-'][a-zA-Zàâäéèêëçùûüôö'-]+[^-']$/;
    const lastName = document.getElementById('lastName');
    const firstName = document.getElementById('firstName');
    regexAdrress = /^.{6,}$/;
    const address = document.getElementById('inputAddress');
    validateForm(regexEmail, inputEmail4);
    validateForm(regexPostalCode, city);
    validateForm(regexName, lastName);
    validateForm(regexName, firstName);
    validateForm(regexAdrress, address);
    if(isvalidateForm === 5) {
        return true;
    } else {
        return false;
    }
    
}

function validateForm(regex, input) {
    input.onchange = function () {  
        if((regex.test(input.value) === true) ) {
            const notValide = document.getElementById(input.id+"-notValide");
            if(notValide !== null) {
                notValide.remove();
            }
            input.style.border = " 2px solid #3ed000";
            getFormField(input.name, input.value);
            isvalidateForm++;
        } else {
            input.style.border = " 2px solid #dc3545 ";
            const notValide = document.createElement('p');
            notValide.id = input.id+"-notValide";
            const parentNode = input.parentNode;
            notValide.innerText = "\"" + input.value + "\" is not valide";
            parentNode.insertBefore(notValide, input);
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
// function checkInputEmpty() {
//     let inputEmpty = true;
//     const inputs = document.querySelectorAll('.form-control');
//         for (input of inputs) {
//             if (input.value == "") {
//                 input.style.border = "2px solid #dc3545";
//                 inputEmpty =  false;
//             } else  {
//                 input.style.border = "2px solid #3ed000";
//                 getFormField(input.name, input.value);
//             }
//         }
//         if(inputEmpty === false ) {
//             return false;
//         } else {
//             return true 
//         }     
// }

function submitForm() {
    const btnSubmit = document.getElementById('btn-submit');
    btnSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        const isCheckboxEmpty = checkCheckboxEmpty();
        const isValidateForm = validateFormRegex()
        if((isCheckboxEmpty === true) && (isValidateForm === true)) { 
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



