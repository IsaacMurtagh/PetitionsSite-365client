
export default {

    validEmail: function (email) {
        return /^[\w|.|-|_|\d]+@[\w|.|-|_|\d]+$/.test(email)
    },

    validPassword: function(password) {
        return password && password.length > 1
    },

    validName: function(name) {
        return name && name.length > 1
    },

    validImage: function(imageType) {
        return imageType && imageType === "image/png" || imageType === "image/jpeg" || imageType === "image/gif";
    },
}