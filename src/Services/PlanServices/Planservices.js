import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../Auth/HttpHelper";



class PlanService {

   
    AllPlan(id){
        return axios.get(`${config.apiUrl}/api/plan/get`)
    }
    OnePlan(class_id){
        return axios.get(`${config.apiUrl}/api/plan/get/class/${class_id}`,HttpHelper?.getAuthHeader())
    }
  

    
  }
  
  export default PlanService = new PlanService();