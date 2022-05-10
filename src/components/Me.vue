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
            <span class="u-name">
                {{ data.display_name || "匿名" }}
                <el-tooltip content="签约作者" v-if="isSuperAuthor" placement="top">
                    <span class="u-superauthor">
                        <img :src="super_author_icon" alt="superauthor" />
                    </span>
                </el-tooltip>
            </span>
            <div>
                <span class="u-uid">UID : {{ data.ID || 0 }}</span>
                <el-tooltip :content="`当前经验 ${data.experience || 0}`" placement="top">
                    <span class="u-level" :class="'lv-' + level" :style="{backgroundColor:showLevelColor(level)}">Lv.{{ level }}</span>
                </el-tooltip>
                <el-tooltip :content="vipTypeTitle" v-if="isPRO || isVIP" placement="top">
                    <a class="u-vip" href="/vip/premium?from=user_homepage" target="_blank">
                        <i class="i-icon-vip on">{{ vipType }}</i>
                    </a>
                </el-tooltip>
            </div>
            <span class="u-join" v-if="data.user_registered">
                <i class="u-icon u-icon-join">
                    <img svg-inline src="../assets/img/join.svg" />
                </i>
                <span>加入于 {{ data.user_registered | time }}</span>
            </span>
            <div class="u-medals" v-if="medals && medals.length">
                <span class="u-medal" v-for="(item, i) in medals" :key="i">
                    <img :src="item.medal | showMedalIcon" :title="item | showMedalDesc" />
                </span>
            </div>
            <div class="u-bio">{{ data.user_bio }}</div>

            <div class="u-links">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div>
                            <a
                                v-if="data.weibo_name"
                                class="u-weibo"
                                :href="data.weibo_id | getWeiboLink"
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
                                :href="data.github_name | getGithubLink"
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
                                推栏ID：{{ data.tuilan_id }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <a v-if="data.tv_type && data.tv_id" class="u-tv" :href="tv_link" target="_blank">
                                <img :src="tv_img" />
                                直播间：{{ data.tv_id }}
                            </a>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="u-teams">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(item, i) in teams" :key="i">
                        <div>
                            <a class="u-team" :href="item.team_id | teamLink">
                                <img class="u-team-logo" :src="item.team_logo | showTeamLogo" />
                                <span class="u-team-name">{{ item.team_name }}</span>
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
import { __imgPath,__userLevelColor } from "@jx3box/jx3box-common/data/jx3box";
import dateFormat from "../utils/dateFormat";
import { getUserMedals, getFrames, getUserPublicTeams } from "@/service/author";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
import User from "@jx3box/jx3box-common/js/user";
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
            // isSuperAuthor: false,
            // isPRO: false,
            isVIP: false,
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
            return this.data.user_avatar || "";
        },
        avatar_frame: function () {
            return this.data.user_avatar_frame || "";
        },
        tv_link: function () {
            return tvLink(this.data.tv_type, this.data.tv_id) || "";
        },
        tv_img: function () {
            return __imgPath + "image/tv/" + this.data.tv_type + ".png";
        },
        frameName: function () {
            return this.avatar_frame && this.frames[this.avatar_frame] ? this.avatar_frame : "";
        },
        frameUrl: function () {
            if (this.frameName) {
                let fileName = this.frames[this.frameName].files.l.file;
                return __imgPath + `image/avatar/${this.frameName}/${fileName}`;
            }
            return "";
        },
        isCircle: function () {
            return this.frameName && this.frames[this.frameName].style == "circle";
        },
        isPRO: function () {
            return this.data?.is_pro;
        },
        isSuperAuthor: function () {
            return !!this.data?.sign;
        },
        vipType: function () {
            return this.isPRO ? "PRO" : "PRE";
        },
        vipTypeTitle: function () {
            return this.isPRO ? "专业版会员用户" : "高级版会员用户";
        },
        super_author_icon: function () {
            return __imgPath + "image/user/" + "superauthor.svg";
        },
        level: function () {
            return User.getLevel(this.data?.experience || 0);
        },
    },
    filters: {
        time: (val) => {
            return dateFormat(new Date(val));
        },
        showMedalIcon: function (val) {
            return __imgPath + "image/medals/user/" + val + ".gif";
        },
        showMedalDesc: function (item) {
            return item.medal_desc || medal_map[item.medal];
        },
        showAvatar: function (val) {
            return showAvatar(val, 360);
        },
        teamLink: function (val) {
            return getLink("org", val);
        },
        showTeamLogo: function (val) {
            return showAvatar(val, 32);
        },
        getWeiboLink: function (val) {
            return "https://weibo.com/" + val;
        },
        getGithubLink: function (val) {
            return "https://github.com/" + val;
        },
    },
    methods: {
        init: function () {
            this.loadFrames();
            this.loadMedals();
            this.loadTeams();
        },
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
            getUserPublicTeams(this.uid).then((data) => {
                this.teams = data || [];
            });
        },
        showLevelColor : function (level){
            return __userLevelColor[level]
        }
    },
    mounted: function () {
        if (this.uid) {
            this.init();
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/top.less";
</style>
