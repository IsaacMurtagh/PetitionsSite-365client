const axios = require('axios').default;

const SERVER_URL = ' http://localhost:4941/api/v1'

const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Authorization"
    }
});

export default {

    getPetitions: (parameters) => instance.get("/petitions", {
        params: parameters
    }).then(function (response) {
        console.log(response);
    })

}