import { $cms } from "@jx3box/jx3box-common/js/https";

function getPosts(params) {
    return $cms().get(`/api/cms/posts`, {
        params,
    });
}

function getUserInfo(uid) {
    return $cms().get(`/api/cms/user/${uid}/info`,{
        params : {
            nocache : 1
        }
    });
}

function getSuperAuthor(uid) {
    return $cms().get('/api/cms/user/is_super_author/' + uid)
}

function getIdentity(uid) {
    return $cms().get(`/api/cms/user/${uid}/identity`)
}

function getUserPz(params){
    return $cms().get(`/api/cms/app/pz`,{
        params : params
    })
}

export {
    getPosts,
    getUserInfo,
    getSuperAuthor,
    getIdentity,
    getUserPz
};
