import { $helper } from './axios'
import { $cms } from "@jx3box/jx3box-common/js/https.js"

function getCollections(params) {
    return $cms().get(`/api/cms/post/collection`, { params });
}

function getNamespaces(params) {
    return $helper()({
        method: "GET",
        url: `/api/namespaces`,
        params: params,
    });
}

function getPlans(params) {
    return $helper()({
        method: "GET",
        url: `/api/item_plans`,
        params: params,
    });
}

function getWikis(params) {
    return $helper()({
        method: "GET",
        url: `/api/wiki/posts`,
        params: params,
    });
}

function muteUser(uid, params) {
    return $helper().put(`/api/user/${uid}/mute`, params);
}

export { $helper, getCollections, getNamespaces, getPlans, getWikis, muteUser };
