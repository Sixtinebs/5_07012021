function getLocalStorageOrderId() {
    let orderId = window.localStorage.getItem('order_id');
    let sum = window.localStorage.getItem('sum');
    if(!sum || !orderId) {
        displayMessageError();
    } else {
        displayMessageConfirmation(orderId, sum)
    }
    redirectHomePage();
}

function displayMessageError() {
    const sectionHtml = document.getElementById('order-id-message');
    const newP = document.createElement('p');
    newP.innerText= "Une erreur est survenu durant la transaction";
    sectionHtml.appendChild(newP);
}

function displayMessageConfirmation(orderId, sum) {
    const sectionHtml = document.getElementById('order-id-message');
    const newP = document.createElement('p');
    newP.innerText = 'Merci pour votre commande. Le prix total est de '+ sum +'€ et votre numéro de commande est le suivant: '+ orderId + '. Merci pour votre confiance, un email de confirmation va vous être envoyé ! A bientôt !' ;
    sectionHtml.appendChild(newP);
    window.localStorage.clear();
}

function redirectHomePage() {
    const redirect = document.getElementById('times');
    time = 20;
        setInterval(function(){ 
            time--;
            redirect.innerText = time;
            if(time === 0 || time < 0) {
                window.location.href = "../index.html";
            }
        }, 1000);
}

(function() {
    getLocalStorageOrderId();

})()