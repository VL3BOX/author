import axios from "axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
import {
    installInterceptors,
    installNextInterceptors,
} from "@jx3box/jx3box-common/js/axios";

const $http = axios.create({
    // withCredentials: true,
    // baseURL: process.env.NODE_ENV === "production" ? __server : "/",
    baseURL: __server,
});
installInterceptors($http);

const $server = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __server : "/",
});

function getPosts(params) {
    return $http.get("post/list", {
        params: params,
    });
}

function checkUser(uid, status) {
    return $server.post("user/admin", {
        ID: uid,
        user_status: status,
    });
}

export { getPosts, checkUser };
