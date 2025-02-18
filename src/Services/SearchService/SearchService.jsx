import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../Auth/HttpHelper";



class SerachServices {


    Search(search){
        return axios.get(`${config.apiUrl}/api/search?q=${search}`)
    }
  }
  
  export default SerachServices = new SerachServices();