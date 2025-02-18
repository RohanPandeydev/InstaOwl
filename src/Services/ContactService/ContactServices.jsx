import axios from "axios";
import config from "../../../config";



class ContactService {


    ContactFrom(formdata) {
        return axios.post(`${config.apiUrl}/api/contact`,formdata)
    }
   

    // Leadership(id){
    //     return axios.get(`${config.apiUrl}/api/aboutus/leadership/findAll/${id}`)
    // }
    // Faq(id){
    //     return axios.get(`${config.apiUrl}/api/aboutfaq/findAll/${id}`)
    // }
}

export default ContactService = new ContactService();