export default class API {
    
    http = async (method, url, params) => {
        let headersContent = { 
            "Content-Type": "application/json"
        }
        let headers = new Headers(headersContent);
        let response = await fetch("https://celerity-backend.herokuapp.com" + url, {
            method,
            headers: headers,
            body: JSON.stringify(params)
        });

        try {
            return await response.json();
        } catch (error) {
            throw error;
        }

    }
    get = (url) => this.http("GET", url);

    post = (url, params) => this.http("POST", url, params);
}