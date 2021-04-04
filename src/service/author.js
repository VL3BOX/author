import { $next, $team } from "./axios";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import axios from "axios";

function getDouyu(ids) {
    return $next().get("/team/douyu", {
        params: {
            tv_id: ids,
        },
    });
}

function getUserMedals(uid) {
    return $next().get("/api/user/" + uid + "/medals");
}

function getFrames() {
    return axios.get(__imgPath + "data/user_avatar_frame.json");
}

function getUserPublicTeams(uid) {
    return $team({ mute: true })
        .get(`/api/team/relation/public`, {
            params: {
                uid: uid,
            },
        })
        .then((res) => {
            return res.data.data;
        });
}

export { getDouyu, getUserMedals, getFrames, getUserPublicTeams };
