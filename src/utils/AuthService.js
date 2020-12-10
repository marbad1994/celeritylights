import API from './Api';

export default class AuthService {
    constructor() {
      this.API = new API();
    }

    login = (username, password) => this.API.post("/login", { username: username, password: password });

    register = (username, password, email, address, firstName, lastName) => this.API.post("/register", {username: username, password: password, email: email, address: address, firstName: firstName, lastName: lastName})

    getStats = (token) => this.API.post("/stats", {token: token});

    getProfile = (token) => this.API.post("/profile-data", {token: token});

}