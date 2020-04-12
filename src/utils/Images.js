export default {

    dataUrl: function(contentType, byteArray) {
        const data = btoa(String.fromCharCode.apply(null, new Uint8Array(byteArray)));
        return 'data:' + contentType + ';base64,' + data
    }

}