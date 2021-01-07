// fetch("https://www.une-url.com")
// .then(response => response.json())
// .then(response => alert(JSON.stringify(response)))
// .catch(error => alert("Erreur : " + error));


/*---------- Requete AJAX ---------*/
let newP = document.createElement('p');
// create new object -> XMLHttpRequest
var request = new XMLHttpRequest();

//initialise request
request.open("GET", "http://localhost:3000/api/furniture");
//response format -> JSON
request.responseType = "json";
//send request -> server web
request.send();

//when have response
request.onload = function(){
    if (request.status != 200){ 
        newP.textContent = "Erreur " + request.status + " : " + request.statusText;
    }else{ 
        newP.textContent = request.response.length + " octets  téléchargés\n" + JSON.stringify(request.response);
    }
};

//If request don't work
request.onerror = function(){
    newP.textContent = "La requête a échoué";
};

//During the load
request.onprogress = function(event){
    //lengthComputable = booléen; true si la requête a une length calculable
    if (event.lengthComputable){
        // loaded = contains the number of bytes downloaded
        // total = contains the total number of bytes to download       
        newP.textContent = event.loaded + " octets reçus sur un total de " + event.total;
    }
};
console.log(request);
console.log(response[0].name);
/*---------- END Requete AJAX ---------*/

