import StorageHelper from "./StorageHelper";

class HttpHelper {


    getAuthHeader() {
        return {
            headers: {
                "Authorization":StorageHelper.getToken(),
            }
        }
    }

    getAuthHeaderMultiPart() {
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization":StorageHelper.getToken(),
            }
        }
    }
}

export default HttpHelper = new HttpHelper();