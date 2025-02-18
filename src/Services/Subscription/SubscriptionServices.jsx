import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../Auth/HttpHelper";



class SubscriptionService {

   
  

    user_subscription(formData){
        return axios.post(`${config.apiUrl}/api/subscription/create`,formData,HttpHelper.getAuthHeader())
    }
    user_subscriptions(userId){
        return axios.get(`${config.apiUrl}/api/subscription/getByUser/${userId}`,HttpHelper.getAuthHeader())
    }

   

   
  }
  
  export default SubscriptionService = new SubscriptionService();