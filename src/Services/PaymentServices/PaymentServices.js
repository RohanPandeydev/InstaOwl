import axios from "axios";
import config from "../../../config";

class PaymentServices {
  CreateNewOrder(formData) {
    return axios.post(`${config.apiUrl}/api/payment`, formData);
  }
  GetStatus(orderid) {
    return axios.get(`${config.apiUrl}/api/status/${orderid}`);
  }
}

export default PaymentServices = new PaymentServices();
