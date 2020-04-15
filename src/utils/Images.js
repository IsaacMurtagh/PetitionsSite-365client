export default {

    dataUrl: function(contentType, byteArray) {
        const data = btoa(String.fromCharCode.apply(null, new Uint8Array(byteArray)));
        return 'data:' + contentType + ';base64,' + data
    },

    convertBlobToBase64: blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    })

}