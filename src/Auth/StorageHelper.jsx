class StorageHelper {
    // token
    setToken(data) {
        localStorage.setItem("insta_owl_user_token", data);
    }

    getToken() {
        return localStorage.getItem("insta_owl_user_token");
    }
    getUserData() {
        return  JSON.parse(localStorage.getItem("insta_owl_user_details"));
    }

    removeToken() {
        
        localStorage.removeItem("insta_owl_user_details");
        return localStorage.removeItem("insta_owl_user_token");
    }

  
}

export default StorageHelper= new StorageHelper();
