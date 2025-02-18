import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../Auth/HttpHelper";



class VideoService {

    Video(cid,sid,id) {
        // video/getVideo
        return axios.get(`${config.apiUrl}/api/video/getVideo/${cid}/${sid}/${id}`, HttpHelper.getAuthHeader())

        // /subject/getSubject
    }

    PopularVideo(id) {
        return axios.get(`${config.apiUrl}/api/video/popularVideos`,)
    }
    EachVideo(cid,sid,tid,id,user_id) {
        console.log("cid,sid,tid,id,user_id",cid,sid,tid,id,user_id)
        return axios.get(`${config.apiUrl}/api/video/getOneVideo/${cid}/${sid}/${tid}/${id}?user=${user_id}`, HttpHelper?.getAuthHeader())
    }
    SubjectVideo(id) {
        return axios.get(`${config.apiUrl}/api/video/getBySubject/${id}`, HttpHelper?.getAuthHeader())
    }
    WatchList(FormData) {
        return axios.post(`${config.apiUrl}/api/watchtime/save`, FormData, HttpHelper?.getAuthHeader())
    }
    isWatchListed(videoId) {
        return axios.get(`${config.apiUrl}/api/watchtime/get/user/video/${videoId}`, HttpHelper?.getAuthHeader())
       
    }
    myWatchList(userId) {
        return axios.get(`${config.apiUrl}/api/watchlist/get/user/${userId}`, HttpHelper?.getAuthHeader())
    }
    // 
    watchTime(FormData) {
        return axios.post(`${config.apiUrl}/api/watchtime/save`, FormData, HttpHelper?.getAuthHeader())
    }
 

    // /watchlist/get/user/:userid
    // /watchlist/getAll/:userId

    // Leadership(id){
    //     return axios.get(`${config.apiUrl}/api/aboutus/leadership/findAll/${id}`)
    // }
    // Faq(id){
    //     return axios.get(`${config.apiUrl}/api/aboutfaq/findAll/${id}`)
    // }
}

export default VideoService = new VideoService();