const axios = require('axios').default;

// This url points to itself, but a proxy transforms this to the server address in vue.configs.js
// This is required as CORS policy will stop the client communicating with the server otherwise
const SERVER_URL = 'http://localhost:8080/api/v1';

const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000,
    // headers: {
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": "true",
    //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Authorization"
    // }
});

export default {

    getPetitions: (parameters) => instance.get("/petitions", {
        params: parameters
    }).then(response => {
        return response
    }).catch(err => {
        console.log(err)
    }),

    getPetitionsById: (id) => instance.get("/petitions/" + id)
        .then(response => {
            return response
        }).catch(err => {
            console.log(err)
        })

}