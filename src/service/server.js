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

function getPosts(params) {
    return $http.get("post/list", {
        params: params,
    });
}

export { getPosts };
