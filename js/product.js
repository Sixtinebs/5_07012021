// const $localStorage = localStorage.getItem("idProduct");
// console.log($localStorage);
let urlcourante = document.location.href;
const yourProduct = document.getElementById("yourProduct");
const searchParams = new URLSearchParams(urlcourante);
function getId() {
    for (let p of searchParams) {
        return p[1];
    }
}
console.log(getId());

const getFurniture = async function () {
    try {
        //attendre un retour
        let response = await fetch('http://localhost:3000/api/furniture')
        if (response.ok) {
            let data = await response.json()
            console.log(data);
            for (let i of data) {
                if(i._id == getId()){
                    console.log(i._id);
                    yourProduct.innerHTML =' <div class="card mb-3" style="max-width: 540px;"><div class="row g-0"><div class="col-md-4"><img src="'+ i.imageUrl +'" alt="..." style="width: 100%;" ></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">'+ i.name +'</h5><p class="card-text">'+ i.description +'</p><p class="card-text"><small class="text-muted">' + i.price +  ' € </small></p></div></div><a href="pages/product.html?id='+ i._id +'"><button type="button" class="btn btn-outline-success btn-product" id="'+ i._id +'" value="'+ i.name +'">Mettre dans le panier</button></a></div></div>';
                }
            }
        //console.log(data[0].name)
    } else {
            console.error(response.status)
        }
    } catch (e) {
        console.log(e)
    }

}
getFurniture();


