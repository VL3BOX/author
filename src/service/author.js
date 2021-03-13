import { $next } from "@jx3box/jx3box-common/js/axios";
import { __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
import axios from 'axios'

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

function getFrames() {
    return axios.get(__imgPath + "data/user_avatar_frame.json");
}

export { getDouyu, getUserMedals, getFrames };
