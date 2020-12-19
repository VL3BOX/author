import { $next } from "@jx3box/jx3box-common/js/axios";

function getDouyu(ids) {
    return $next.get("/team/douyu", {
        params: {
            tv_id: ids,
        },
    });
}

function getUserMedals(uid) {
    return $next.get("/api/user/" + uid + "/medals");
}

export { getDouyu, getUserMedals };
