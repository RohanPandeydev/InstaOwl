import axios from "axios";
import config from "../../../config";



class AuthService {

   
    Login(formData){
        return axios.post(`${config.apiUrl}/api/auth/login`,formData)
    }
    // /auth/sendotp
    Otp(formData){
        return axios.post(`${config.apiUrl}/api/auth/sendotp`,formData)
    }
  

   

    // Leadership(id){
    //     return axios.get(`${config.apiUrl}/api/aboutus/leadership/findAll/${id}`)
    // }
    // Faq(id){
    //     return axios.get(`${config.apiUrl}/api/aboutfaq/findAll/${id}`)
    // }
  }
  
  export default AuthService = new AuthService();