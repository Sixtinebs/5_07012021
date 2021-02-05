
function getLocalStorageOrderId() {
    let orderId = window.localStorage.getItem('order_id');
    console.log(orderId);
    displayMessageConfirmation(orderId)
}
function displayMessageConfirmation(orderId) {
    const sectionHtml = document.getElementById('order-id-message');
    const newP = document.createElement('p');
    newP.innerText = 'Votre numéros de commande:' + orderId + 'Merci pour votre confiance, vous recevrez un e-mail de confirmation. À bientôt :).';
    sectionHtml.appendChild(newP);
    window.localStorage.clear();
}

(function() {
    getLocalStorageOrderId();

})()