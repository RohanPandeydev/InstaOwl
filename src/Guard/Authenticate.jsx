
import StorageHelper from "../Auth/StorageHelper";


const  Authenticate=()=>{
    const token=StorageHelper.getToken()

    //console.log(token,"nrewnrwne")

    if(token){
        return true
    }else {
        return false
    }
}

export default Authenticate



