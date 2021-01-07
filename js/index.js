
const $newDiv = document.createElement('div');
let $produits = document.getElementById('produits');
console.log($produits);



const $request = new XMLHttpRequest();
$request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        const $response = JSON.parse(this.responseText);
        $produits.innerHTML = '<p>' + $response[0].name + '</p>';
        console.log($response);
        function resName() {
            for(let i in $response) {
                console.log($response[i].name);
                $produits.innerHTML = ' <div class="card mb-3" style="max-width: 540px;"><div class="row g-0"><div class="col-md-4"><img src="..." alt="..."></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">'+ $response[i].name +'</h5><p class="card-text">'+ $response[i].description +'</p><p class="card-text"><small class="text-muted">' + $response[i].price +  '</small></p></div></div></div></div>';

            }
        }
        resName();
       
    }
};

$request.open("GET", "http://localhost:3000/api/furniture");
$request.send();


