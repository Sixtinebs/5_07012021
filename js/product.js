let urlcourante = document.location.href;
const yourProduct = document.getElementById("yourProduct");
const searchParams = new URLSearchParams(urlcourante);

// recover param of url
function getId() {
    for (let p of searchParams) {
        return p[1];
    }
}
// creat input for choose option cameras
function chooseOptionsCameras(options) {
    const newDiv = document.createElement('div');
    const newSelect = document.createElement('select');
    newSelect.setAttribute("name", "options");

    for (option of options) {
        const newOption = document.createElement('option');
        newOption.setAttribute("value", option);

        let contenu = document.createTextNode(option);
        newDiv.appendChild(newSelect);
        newSelect.appendChild(newOption);
        newOption.appendChild(contenu);
        document.getElementsByClassName("card-body")[0].appendChild(newDiv);

    }
}
//stock camera select => localStorage
function setElementStorage(param, card) {
    const newBtn = document.createElement('button');
    newBtn.addEventListener('click', function () {
        // transform object => string
        let storedIds = JSON.parse(localStorage.getItem("id"));
        if(storedIds === null) {
            storedIds =[];
        }
        storedIds.push(param);
        // transform string =>
        localStorage.setItem("id", JSON.stringify(storedIds));
        
        console.log(storedIds);
    })
    card.appendChild(newBtn);
}

const getCameras = async function () {
    try {
        const param = getId();
        //API
        let response = await fetch('http://localhost:3000/api/cameras/'+ param);
        if (response.ok) {
            let data = await response.json()
            yourProduct.innerHTML = ' <div class="card mb-3" style="max-width: 540px;"><div class="row g-0"><div class="col-md-4"><img src="' + data.imageUrl + '" alt="..." style="width: 100%;" ></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">' + data.name + '</h5><p class="card-text">' + data.description + '</p><p class="card-text"><small class="text-muted">' + data.price + ' € </small></p></div></div><a href="basket.html?id=' + data._id + '"><button type="button" class="btn btn-outline-success btn-product" id="' + data._id + '" value="' + data.name + '">Voir le panier</button></a></div></div>';
            const card = document.getElementsByClassName("card-body")[0];
            chooseOptionsCameras(data.lenses);
            setElementStorage(param, card);
        } else {
            console.error(response.status);
        }
    } catch (e) {
        console.log(e);
    }

}
getCameras();


