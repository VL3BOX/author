<template>
    <div class="m-author-header">
        <div class="m-author-avatar">
            <img
                class="u-avatar"
                id="m-setting-avatar-img"
                :src="avatar | showAvatar"
                :alt="data.name || '匿名'"
                :class="{ isCircle }"
            />
            <i class="u-avatar-frame" v-if="frameName">
                <img :src="frameUrl" />
            </i>
        </div>

        <div class="m-author-info">
            <!-- TODO:等级 -->
            <span class="u-name">{{ data.name || "匿名" }}</span>
            <span class="u-uid">UID : {{ data.uid || 0 }}</span>
            <span class="u-join" v-if="data.created_at">
                <i class="u-icon u-icon-join">
                    <img svg-inline src="../assets/img/join.svg" />
                </i>
                <span>加入于 {{ data.created_at | time }}</span>
            </span>
            <div class="u-medals" v-if="medals && medals.length">
                <span class="u-medal" v-for="(item, i) in medals" :key="i">
                    <img :src="item.medal | showTeamMedal" :title="medal_map[item.medal]" />
                </span>
            </div>
            <div class="u-bio">{{ data.bio }}</div>

            <div class="u-links">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div>
                            <a
                                v-if="data.weibo_name"
                                class="u-weibo"
                                :href="data.weibo_url"
                                target="_blank"
                            >
                                <img svg-inline src="../assets/img/weibo.svg" />
                                {{ data.weibo_name }}
                            </a>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <a
                                v-if="data.github_name"
                                class="u-github"
                                :href="data.github_url"
                                target="_blank"
                            >
                                <img svg-inline src="../assets/img/github.svg" />
                                {{ data.github_name }}
                            </a>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <span v-if="data.tuilan_id" class="u-tuilan" title="推栏ID">
                                <img src="../assets/img/tuilan.png" />
                                推栏ID：{{
                                data.tuilan_id
                                }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <a
                                v-if="data.tv_type && data.tv_id"
                                class="u-tv"
                                :href="tv_link"
                                target="_blank"
                            >
                                <img :src="tv_img" />
                                直播间：{{
                                data.tv_id
                                }}
                            </a>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="m-author-teams">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(item,i) in teams" :key="i">
                        <div>
                            <a class="u-team" :href="item.team_id | teamLink">
                                <img class="u-team-logo" :src="item.team_logo | showTeamLogo" />
                                <span class="u-team-name">{{item.team_name}}</span>
                            </a>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { showAvatar, tvLink, getLink } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box";
import dateFormat from "../utils/dateFormat";
import { getUserMedals, getFrames, getUserPublicTeams } from "@/service/author";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
export default {
    name: "Me",
    props: [],
    data: function () {
        return {
            // data: {},
            medals: [],
            medal_map,
            frames,
            teams: [
                // {
                //     team_id: 2,
                //     team_logo:
                //         "https://oss.jx3box.com/upload/avatar/2020/12/11/8908884.png",
                //     team_name: "诗画印象",
                //     team_server: "蝶恋花",
                // },
                // {
                //     team_id: 2,
                //     team_logo:
                //         "https://oss.jx3box.com/upload/avatar/2020/12/11/8908884.png",
                //     team_name: "诗画印象",
                //     team_server: "蝶恋花",
                // },
            ],
        };
    },
    computed: {
        uid: function () {
            return this.$store.state.uid;
        },
        data: function () {
            return this.$store.state.userdata;
        },
        avatar: function () {
            return this.data.avatar || "";
        },
        avatar_frame: function () {
            return this.data.avatar_frame || "";
        },
        tv_link: function () {
            return tvLink(this.data.tv_type, this.data.tv_id) || "";
        },
        tv_img: function () {
            return __imgPath + "image/tv/" + this.data.tv_type + ".png";
        },
        frameName: function () {
            return this.avatar_frame && this.frames[this.avatar_frame]
                ? this.avatar_frame
                : "";
        },
        frameUrl: function () {
            if (this.frameName) {
                let fileName = this.frames[this.frameName].files.l.file;
                return __imgPath + `image/avatar/${this.frameName}/${fileName}`;
            }
            return "";
        },
        isCircle: function () {
            return (
                this.frameName && this.frames[this.frameName].style == "circle"
            );
        },
    },
    filters: {
        time: (val) => {
            return dateFormat(new Date(val));
        },
        showTeamMedal: function (val) {
            return __imgPath + "image/medals/team/" + val + "-20.gif";
        },
        showAvatar: function (val) {
            return showAvatar(val, 180);
        },
        teamLink: function (val) {
            return getLink("org", val);
        },
        showTeamLogo: function (val) {
            return showAvatar(val, 16);
        },
    },
    methods: {
        loadMedals: function () {
            if (!this.uid) return;
            getUserMedals(this.uid).then((res) => {
                this.medals = res.data.data;
            });
        },
        loadFrames: function () {
            getFrames().then((res) => {
                if (res.data) {
                    this.frames = res.data || [];
                }
            });
        },
        loadTeams: function () {
            getUserPublicTeams(this.uid).then((res) => {
                this.teams = res.data.data || [];
            });
        },
    },
    mounted: function () {
        if (this.uid) {
            this.loadFrames();
            this.loadMedals();
            this.loadTeams();
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/top.less";
</style>
