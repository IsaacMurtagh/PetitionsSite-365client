const axios = require('axios').default;

// This url points to itself, but a proxy transforms this to the server address in vue.configs.js
// This is required as CORS policy will stop the client communicating with the server otherwise
const SERVER_URL = 'http://localhost:8080/api/v1';

const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, ContentType, Accept",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    }
});

export default {

    getPetitions: (parameters) => instance.get("/petitions", {
        params: parameters
    }).then(response => {
        return response
    }).catch(err => {
        return err.response
    }),

    getPetitionsById: (id) => instance.get("/petitions/" + id)
        .then(response => {
            return response
        }).catch((err) => {
            return err.response
        }),

    getPetitionImage: (id) => instance.get("petitions/" + id + "/photo", {responseType: "arraybuffer"})
        .then(response => {
            return response
        }).catch(err => {
            return err.response
        }),

    getUserImage: (id) => instance.get("users/" + id + "/photo", {responseType: "arraybuffer"})
        .then(response => {
            return response
        }).catch(err => {
            return err.response
        }),

    getSignatures: (id) => instance.get("petitions/" + id + "/signatures")
        .then(response => {
            return response
        }).catch(err => {
            return err.response
        }),

    getCategories: () => instance.get("petitions/categories")
        .then(response => {
            return response;
        }).catch(err => {
            return err.response;
        }),

    // User

    createAccount: (body) => instance.post("users/register", body)
        .then(response => {
            return response;
        }).catch(err => {
            return err.response;
        }),

    editAccount: (body, id) => instance.patch("users/" + id, body)
        .then(response => {
            return response;
        }).catch(err => {
            return err.response;
        }),

    login: (body) => instance.post("users/login", body)
        .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_id", response.data.userId);
            instance.defaults.headers.common['X-Authorization'] = response.data.token;
            return response;
        }).catch(err => {
            return err.response;
        }),

    logout: () => instance.post("users/logout")
        .then(response => {
            return response;
        }).catch(err => {
            return err.response;
        }),

    // Signatures
    signPetition: (petitionId) => instance.post("petitions/" + petitionId + "/signatures")
        .then(response => {
            return response;
        }).catch(err => {
            return err.response
        }),

    deleteSignature: (petitionId) => instance.delete("petitions/" + petitionId + "/signatures")
        .then(response => {
            return response;
        }).catch(err => {
            return err.response
        }),


    uploadProfileImage: (id, rawImage, imageType) => instance.put("users/" + id + "/photo", rawImage,
        {
            headers: {
                'Content-Type': imageType,
            }
        })
        .then(response => {
            return response;
        }).catch(err => {
            return err.response;
        }),

    getProfileInformation: (id) => instance.get("users/" + id)
        .then(response => {
            return response;
        }).catch(err => {
            return err.response;
        }),

    setHeaderToken: function (token) {
        instance.defaults.headers.common['X-Authorization'] = token;
    }

}