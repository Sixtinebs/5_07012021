
// recover element of put in basket =>localStorage
function getLocalStorage() {
    //if localStorage is empty
    const localStorageLength = window.localStorage.length;
    if(localStorageLength === 0){
        return false;
    }else {
        let localStorageGetItem = JSON.parse(localStorage.getItem("id"));
        return localStorageGetItem;
    }
}
const getItems = getLocalStorage();

// afficher le nom + le prix en liste des elements mis dans le panier
function findCameras(response, getItems) {
    console.log(response.length);
    console.log(getItems.length);
    for(let i = 0; i < response.length; i++){
        console.log(response[i]);
        for(let j = 0; j < getItems.length; i++){
            console.log[j]
            if(response[i] === getItems[j]) {
                console.log(getItems[j]);
            }
        }
    }
    console.log('rien dans le panier')
}

function displayBasket() { 
    const yourBasket = document.getElementsByTagName('h1')[0];
    const listProducts = document.getElementById('listProducts');
    for(id of ids){
        const listElement = '<li>'+resp.name+'</li>'
        listProducts.innerHTML =  listElement;
    }
 }

 //displayBasket();

// faire la somme des prix
//affichier le resultat
// bouton pour valider le panier et passer la commande => afficher le formulaire
//formulaire pour passer la commande: Nom prénom addresse mail, date
// envoie au back-end correctement formaté



const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    // if request done and status = 200 => transform the response in object javascript (JSON)
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        const response = JSON.parse(this.responseText);
        findCameras(response, getItems);
    }
};

request.open("GET","http://localhost:3000/api/cameras");
request.send();

