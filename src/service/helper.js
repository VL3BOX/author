import { $helper} from './axios'

function getCollections(params) {
    return $helper({
        method: "GET",
        url: `/api/post/collections`,
        params: params,
    });
}

<<<<<<< HEAD
function getNamespaces(params) {
    return $http({
=======
function getNamespace(params) {
    return $helper({
>>>>>>> 476568ea95cb104c3fb2f72bf60f0974c1e6f6b2
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

export { $helper, getCollections, getNamespace, getPlans, getWikis, muteUser };
