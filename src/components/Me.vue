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
            <span class="u-name">{{ data.name || "匿名" }}</span>
            <span class="u-uid">UID : {{ data.uid || 0 }}</span>
            <span class="u-join" v-if="data.created_at"
                ><i class="u-icon u-icon-join"
                    ><img svg-inline src="../assets/img/join.svg"/></i
                ><span>加入于 {{ data.created_at | time }}</span></span
            >
            <div class="u-bio">{{ data.bio }}</div>

            <div class="u-links" v-if="data.weibo_name || data.github_name">
                <a
                    v-if="data.weibo_name"
                    class="u-weibo"
                    :href="data.weibo_url"
                    target="_blank"
                    ><img svg-inline src="../assets/img/weibo.svg" />{{
                        data.weibo_name
                    }}</a
                >
                <a
                    v-if="data.github_name"
                    class="u-github"
                    :href="data.github_url"
                    target="_blank"
                    ><img svg-inline src="../assets/img/github.svg" />{{
                        data.github_name
                    }}</a
                >
            </div>
        </div>

        <!-- TODO:加入的团队，勋章等 -->
    </div>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import { default_avatar } from "@jx3box/jx3box-common/js/jx3box";
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
