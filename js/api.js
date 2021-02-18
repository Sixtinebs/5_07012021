function getApi(apiUrl) {
    const promise = new Promise(
        function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if(this.status === 200){
                        const response = JSON.parse(this.responseText);
                        resolve(response);
                    } else {
                        reject(request.status);
                    }
                }
            };
            request.open("GET", apiUrl);
            request.send();
        }
    );
    return promise;
}
