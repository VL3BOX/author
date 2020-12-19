<template>
    <div class="m-author-header">
        <div class="m-author-avatar">
            <img
                class="u-avatar"
                id="m-setting-avatar-img"
                :src="avatar"
                :alt="data.name || '匿名'"
            />
        </div>

        <div class="m-author-info">
            <!-- TODO:等级 -->
            <span class="u-name">{{ data.name || "匿名" }}</span>
            <span class="u-uid">UID : {{ data.uid || 0 }}</span>
            <span class="u-join" v-if="data.created_at"
                ><i class="u-icon u-icon-join"
                    ><img svg-inline src="../assets/img/join.svg"/></i
                ><span>加入于 {{ data.created_at | time }}</span></span
            >
            <div class="u-medals" v-if="medals && medals.length">
                <span class="u-medal" v-for="(item, i) in medals" :key="i"
                    ><img
                        :src="item.medal | showTeamMedal"
                        :title="medal_map[item.medal]"
                /></span>
            </div>
            <div class="u-bio">{{ data.bio }}</div>

            <div class="u-links">
                <el-row :gutter="20">
                    <el-col :span="6"
                        ><div>
                            <a
                                v-if="data.weibo_name"
                                class="u-weibo"
                                :href="data.weibo_url"
                                target="_blank"
                                ><img
                                    svg-inline
                                    src="../assets/img/weibo.svg"
                                />{{ data.weibo_name }}</a
                            >
                        </div></el-col
                    >
                    <el-col :span="6"
                        ><div>
                            <a
                                v-if="data.github_name"
                                class="u-github"
                                :href="data.github_url"
                                target="_blank"
                                ><img
                                    svg-inline
                                    src="../assets/img/github.svg"
                                />{{ data.github_name }}</a
                            >
                        </div></el-col
                    >
                    <el-col :span="6"
                        ><div>
                            <span
                                v-if="data.tuilan_id"
                                class="u-tuilan"
                                title="推栏ID"
                            >
                                <img src="../assets/img/tuilan.png" />推栏ID：{{
                                    data.tuilan_id
                                }}
                            </span>
                        </div></el-col
                    >
                    <el-col :span="6"
                        ><div>
                            <a
                                v-if="data.tv_type && data.tv_id"
                                class="u-tv"
                                :href="tv_link"
                                target="_blank"
                                ><img :src="tv_img" />直播间：{{
                                    data.tv_id
                                }}</a
                            >
                        </div></el-col
                    >
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { showAvatar, getTVlink } from "@jx3box/jx3box-common/js/utils";
import { default_avatar, __imgPath } from "@jx3box/jx3box-common/js/jx3box";
import dateFormat from "../utils/dateFormat";
import { getUserMedals } from "@/service/author";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
export default {
    name: "Me",
    props: ["userdata"],
    data: function() {
        return {
            // data: {},
            medals : [],
            medal_map
        };
    },
    computed: {
        avatar: function() {
            return this.data.avatar
                ? showAvatar(this.data.avatar, "l")
                : default_avatar;
        },
        tv_link: function() {
            return getTVlink(this.data.tv_type, this.data.tv_id) || "";
        },
        tv_img: function() {
            return __imgPath + "image/tv/" + this.data.tv_type + ".png";
        },
        uid : function (){
            return this.data.uid
        },
        data : function (){
            return this.userdata
        }
    },
    filters: {
        time: (val) => {
            return dateFormat(new Date(val));
        },
        showTeamMedal : function (val){
            return __imgPath + 'image/medals/team/' + val + '-20.gif'
        }
    },
    methods: {
        loadMedals : function (){
            if(!this.uid) return
            getUserMedals(this.uid).then((res) => {
                this.medals = res.data.data
            })
        }
    },
    watch: {
        // userdata: function() {
        //     this.data = this.userdata;
        // },
        uid : function (){
            this.loadMedals()
        }
    },
    mounted: function() {
        this.loadMedals()
    },
};
</script>

<style lang="less">
@import "../assets/css/top.less";
</style>
