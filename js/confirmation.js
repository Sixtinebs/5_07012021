
function getLocalStorageOrderId() {
    let orderId = window.localStorage.getItem('order_id');
    console.log(orderId);
    displayMessageConfirmation(orderId)
}
function displayMessageConfirmation(orderId) {
    const sectionHtml = document.getElementById('order-id-message');
    const newP = document.createElement('p');
    newP.innerText = 'Thank you for your order, your number order :'+ orderId + ' Thank you for your trust you will receive a confirmation email soon ! =).' ;
    sectionHtml.appendChild(newP);
    window.localStorage.clear();
}

(function() {
    getLocalStorageOrderId();

})()