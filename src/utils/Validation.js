
export default {

    validEmail: function (email) {
        return /^[\w|.|-|_|\d]+@[\w|.|-|_|\d]+$/.test(email)
    }
}