function getApi(apiUrl, callback) {
    // new promesse
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            const response = JSON.parse(this.responseText);
            callback(response);
        }
    };

    request.open("GET", apiUrl);
    request.send();
}
