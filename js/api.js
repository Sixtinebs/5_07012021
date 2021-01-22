
const urlApi = "http://localhost:3000/api/cameras";

fetch(urlApi)
    .then(response => {
        response.json().then(data => {
            return data;
        })
    })