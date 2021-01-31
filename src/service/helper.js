import axios from "axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";
import {
    installInterceptors,
    installNextInterceptors,
} from "@jx3box/jx3box-common/js/axios";

const $http = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __helperUrl : "/",
});
installInterceptors($http);

function getCollections(params) {
    return $http({
        method: "GET",
        url: `/api/post/collections`,
        headers: { Accept: "application/prs.helper.v2+json" },
        params: params,
    });
}

function getPlans(params){
    return $http({
        method: "GET",
        url: `/api/item_plans`,
        headers: { Accept: "application/prs.helper.v2+json" },
        params: params,
    });
}

export { $http, getCollections,getPlans };
