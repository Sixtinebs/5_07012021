const cameraPrice = [];
// recover element of put in basket =>localStorage
function getLocalStorage() {
    //if localStorage is empty
    let localStorageGetItem = [];
    if(window.localStorage.length === 0){
        localStorageGetItem = [];
        return localStorageGetItem;
    }else {
        localStorageGetItem = JSON.parse(localStorage.getItem("id"));
        return localStorageGetItem;
    }
}
// display element from basket

function displayBasket(camera) { 
    cameraPrice.push(camera.price);
    const list = document.getElementById('listProducts');
    const listElements = document.createElement('li');
    listElements.innerText = camera.name + ' ' + camera.price + '€';
    list.appendChild(listElements);
    
 }

 function totalPrice(listPrices){
    let total = 0;
    for(let i = 0; i < listPrices.length; i++){
        total += listPrices[i];
    }
    const newP = document.createElement('p');
    newP.innerText = total + '€';
    document.getElementById('listProducts').appendChild(newP);
}
//Compare Api and localStorage for find good element in basket
function findCameras(camerasFromApi) {
    const camerasFromStorage = getLocalStorage();
    for(let i = 0; i < camerasFromApi.length; i++){
        for(let k = 0; k < camerasFromStorage.length; k++){
            if(camerasFromApi[i]._id === camerasFromStorage[k]) {
                displayBasket(camerasFromApi[i]);
            }
        } 
    }
    totalPrice(cameraPrice);
}

// bouton pour valider le panier et passer la commande => afficher le formulaire
//formulaire pour passer la commande: Nom prénom addresse mail, date
// envoie au back-end correctement formaté
// Renvoie sur la page de confirmation avec un mot
//ajouter un bouton +/- aux articles



const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    // if request done and status = 200 => transform the response in object javascript (JSON)
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        const response = JSON.parse(this.responseText);
        findCameras(response);
    }
};

request.open("GET","http://localhost:3000/api/cameras");
request.send();

