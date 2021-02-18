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
    newP.innerText= "We are sorry, an error occurred during the transaction";
    sectionHtml.appendChild(newP);
}
function displayMessageConfirmation(orderId, sum) {
    const sectionHtml = document.getElementById('order-id-message');
    const newP = document.createElement('p');
    newP.innerText = 'Thank you for your order. Your total of purchase are  '+ sum +'€ and your number order: '+ orderId + '. Thank you for your trust you will receive a confirmation email soon ! =).' ;
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