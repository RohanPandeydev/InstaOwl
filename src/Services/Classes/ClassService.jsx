import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../Auth/HttpHelper";



class ClassService {


    Classes() {
        return axios.get(`${config.apiUrl}/api/class/getClass`)
    }
    EachClass(id) {
        return axios.get(`${config.apiUrl}/api/class/onlyClass/${id}`)
    }
    Video(id) {
        // video/getVideo
        return axios.get(`${config.apiUrl}/api/video/getVideo/${id}`, HttpHelper.getAuthHeader())

        // /subject/getSubject
    }
    Topics(id) {
        // video/getVideo
        return axios.get(`${config.apiUrl}/api/subject/getSubject`)

        // /subject/getSubject
    }
    Topicbysubject(cid,sid) {
        // video/getVideo
        return axios.get(`${config.apiUrl}/api/topic/getTopic/class/${cid}/${sid}`)

        // /subject/getSubject
    }

    // Leadership(id){
    //     return axios.get(`${config.apiUrl}/api/aboutus/leadership/findAll/${id}`)
    // }
    // Faq(id){
    //     return axios.get(`${config.apiUrl}/api/aboutfaq/findAll/${id}`)
    // }
}

export default ClassService = new ClassService();