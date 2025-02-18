import axios from "axios";
import config from "../../../config";
import HttpHelper from "../../Auth/HttpHelper";

class BlogService {
    allBlogs(page = 1) {
        return axios.get(`${config.apiUrl}/api/post/get/user?page=${page}&limit=9`);
    }
    blogDetails(title) {
        return axios.get(`${config.apiUrl}/api/post/get/user/${title}`);
    }
}

export default BlogService = new BlogService();
