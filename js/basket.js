// recover element of put in basket =>localStorage
function getLocalStorage() {
    //if localStorage is empty
    const localStorageLength = window.localStorage.length;
    if(localStorageLength === 0){
        // retourné un tableau vide
        return false;
    }else {
        let localStorageGetItem = JSON.parse(localStorage.getItem("id"));
        return localStorageGetItem;
    }
}


// afficher le nom + le prix en liste des elements mis dans le panier
function findCameras(camerasFromApi) {
    const camerasFromStorage = getLocalStorage();
    console.log(camerasFromStorage.length);
    console.log(camerasFromApi.length);
    for(let i = 0; i < camerasFromApi.length; i++){
        for(let k = 0; k < camerasFromStorage.length; k++){
            console.log(camerasFromStorage[k])
            if(camerasFromApi[i]._id === camerasFromStorage[k]) {
                console.log('coucou');
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
        findCameras(response);
    }
};

request.open("GET","http://localhost:3000/api/cameras");
request.send();

