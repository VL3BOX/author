import { $cms } from "@jx3box/jx3box-common/js/https";

function getPosts(params) {
    return $cms().get(`/api/cms/posts`, {
        params,
    });
}

function getUserInfo(uid) {
    return $cms().get(`/api/cms/user/${uid}/info`);
}

export { getPosts, getUserInfo };
