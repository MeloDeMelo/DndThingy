export class ApiClient{
    
    getSpellsList(){
        return makeRequest("spells");
    }

    getSpecificSpellWithID(spellIndex){
        return makeRequest("spells/", spellIndex);
    }

    getSpecificSpellWithUrl(url){
        return makeRequestWithUrl(url);
    }
}

function makeRequest(endpoint, params = {}){
    const baseUri = 'http://www.dnd5eapi.co/api/';
    let keys = Object.keys(params);

    let uri = baseUri + endpoint;
    if(keys.length >= 1){
        uri += "?" + keys.map((key) => {
            encodeURIComponent(key) + "=" + 
            encodeURIComponent(params[key]).join('&');
        })
    }
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200){
                resolve(JSON.parse(this.responseText));
            }
        };
        xhttp.open("GET", uri, true);
        xhttp.send();
    });
}

function makeRequestWithUrl(uri){
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200){
                resolve(JSON.parse(this.responseText));
            }
        };
        xhttp.open("GET", uri, true);
        xhttp.send();
    });
}

