export default {

    dataUrl: function(contentType, byteArray) {
        if (byteArray && byteArray.byteLength != 0 && contentType) {
            try {
                const data = btoa(String.fromCharCode.apply(null, new Uint8Array(byteArray)));
                return 'data:' + contentType + ';base64,' + data
            } catch (e) {
                return null
            }
        }
        return null
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