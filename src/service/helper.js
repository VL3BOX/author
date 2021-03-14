import { $helper} from './axios'

function getCollections(params) {
    return $helper({
        method: "GET",
        url: `/api/post/collections`,
        params: params,
    });
}

function getNamespaces(params) {
    return $helper({
        method: "GET",
        url: `/api/namespaces`,
        params: params,
    });
}

function getPlans(params) {
    return $helper({
        method: "GET",
        url: `/api/item_plans`,
        params: params,
    });
}

function getWikis(params) {
    return $helper({
        method: "GET",
        url: `/api/wiki/posts`,
        params: params,
    });
}

function muteUser(uid, params) {
    return $helper.put(`/api/user/${uid}/mute`, params);
}

export { $helper, getCollections, getNamespaces, getPlans, getWikis, muteUser };
