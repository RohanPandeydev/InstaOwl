import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../Auth/HttpHelper";



class UserService {

   
  

    UserUpdate(formData,id){
        return axios.put(`${config.apiUrl}/api/user/update/${id}`,formData,HttpHelper.getAuthHeader())
    }

   

    // Leadership(id){
    //     return axios.get(`${config.apiUrl}/api/aboutus/leadership/findAll/${id}`)
    // }
    // Faq(id){
    //     return axios.get(`${config.apiUrl}/api/aboutfaq/findAll/${id}`)
    // }
  }
  
  export default UserService = new UserService();