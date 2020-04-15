export default {

    dataUrl: function(contentType, byteArray) {
        const data = btoa(String.fromCharCode.apply(null, new Uint8Array(byteArray)));
        return 'data:' + contentType + ';base64,' + data
    },

    blobToData: function (blob) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const data = reader.result.split(',')[1];
            return data;
        }
    }

}