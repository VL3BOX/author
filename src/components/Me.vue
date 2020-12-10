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
            <div class="u-bio">{{ data.bio }}</div>

            <div class="u-links" v-if="data.weibo_name || data.github_name">
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

        <!-- TODO:加入的团队，勋章等 -->
    </div>
</template>

<script>
import { showAvatar, getTVlink } from "@jx3box/jx3box-common/js/utils";
import { default_avatar, __imgPath } from "@jx3box/jx3box-common/js/jx3box";
import dateFormat from "../utils/dateFormat";
export default {
    name: "Me",
    props: ["userdata"],
    data: function() {
        return {
            data: {},
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
    },
    filters: {
        time: (val) => {
            return dateFormat(new Date(val));
        },
    },
    methods: {},
    watch: {
        userdata: function() {
            this.data = this.userdata;
        },
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/top.less";
</style>
