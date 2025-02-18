import axios from "axios";
import config from "../../../config";



class HomeServices {

    Slider(id){
        return axios.get(`${config.apiUrl}/api/banner/getBanner`)
    }
   

    // Leadership(id){
    //     return axios.get(`${config.apiUrl}/api/aboutus/leadership/findAll/${id}`)
    // }
    // Faq(id){
    //     return axios.get(`${config.apiUrl}/api/aboutfaq/findAll/${id}`)
    // }
  }
  
  export default HomeServices = new HomeServices();