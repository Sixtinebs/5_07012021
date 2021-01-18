//const newDiv = document.createElement('div');
const products = document.getElementById('products');
//const btnProducts = document.getElementsByClassName('btn-product');
const url = window.location;
const request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        const response = JSON.parse(this.responseText);
        products.innerHTML = '<p>' + response[0].name + '</p>';
        // Recover card html
        cardProductuest = [];
        // Create card html for all products
        function createCardsCameras() {
            for(let i in response) {
                cardProductuest.push(' <div class="card mb-3" style="max-width: 540px;"><div class="row g-0"><div class="col-md-4"><img src="'+ response[i].imageUrl +'" alt="..." style="width: 100%;" ></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">'+ response[i].name +'</h5><p class="card-text">'+ response[i].description +'</p><p class="card-text"><small class="text-muted">' + response[i].price +  ' € </small></p></div></div><a href="pages/product.html?id='+ response[i]._id +'"><button type="button" class="btn btn-outline-success btn-product" id="'+ response[i]._id +'" value="'+ response[i]._id +'">Mettre dans le panier</button></a></div></div>');
                products.innerHTML = cardProductuest;
            } 
        }
        createCardsCameras();
    }
};

request.open("GET", "http://localhost:3000/api/cameras");
request.send();


