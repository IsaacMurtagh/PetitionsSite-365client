
export default {

    dataUrl: function(contentType, byteArray) {
        if (byteArray && byteArray.byteLength != 0 && contentType) {
            try {
                var arrayBufferView = new Uint8Array(byteArray);
                var blob = new Blob( [ arrayBufferView ], { type: contentType } );
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL( blob );
                return imageUrl
            } catch (e) {
                return e
            }
        }
        console.log("Something went wrong in DataUrl")
        return null
    },

    convertBlobToBase64: blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsArrayBuffer(blob);
    })

}