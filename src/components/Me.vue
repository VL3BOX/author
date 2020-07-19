<template>
    <div class="m-me">
        <div class="m-avatar">
            <img
                class="u-avatar"
                id="m-setting-avatar-img"
                :src="avatar"
                :alt="data.name || '匿名'"
            />
        </div>

        <div class="m-user">
            <span class="u-name">{{ data.name || '匿名'}}</span>
            <span class="u-uid">UID : {{ data.uid || 0}}</span>
            <span class="u-join" v-if="data.created_at"
                ><i class="u-icon u-icon-join"
                    ><img svg-inline src="../assets/img/join.svg"/></i
                ><span>加入于 {{ data.created_at | time }}</span></span
            >
        </div>

        <div class="m-bio">{{ data.bio }}</div>

        <div class="m-link" v-if="data.weibo_name || data.github_name">
            <a v-if="data.weibo_name" class="u-weibo" :href="data.weibo_url" target="_blank"
                ><img svg-inline src="../assets/img/weibo.svg" />{{
                    data.weibo_name
                }}</a
            >
            <a v-if="data.github_name" class="u-github" :href="data.github_url" target="_blank"
                ><img svg-inline src="../assets/img/github.svg" />{{
                    data.github_name
                }}</a
            >
        </div>
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
            return this.data.avatar ? showAvatar(this.data.avatar, "l") : default_avatar
        },
    },
    filters: {
        time: (val) => {
            return dateFormat(new Date(val));
        },
    },
    methods: {
        
    },
    watch : {
        userdata : function (){
            this.data = this.userdata;
        }
    },
    mounted: function() {
    },
};
</script>

<style lang="less">
.m-me {
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
}

.m-avatar {
    border: 1px solid #e1e4e8;
    background-color: #fff;
    width: 100%;
    margin-bottom: 20px;
    overflow: hidden;
    img {
        width: 100%;
        .db;
    }
    box-sizing: border-box;
    .r(4px);
}

.m-user {
    border-bottom: 1px solid #e1e4e8;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .u-name {
        font-size: 26px;
        color: #333;
        font-weight: 700;
        display: block;
        white-space: nowrap;
        word-wrap: normal;
        word-break: keep-all;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .u-uid {
        font-size: 14px;
        line-height: 2;
        color: #666;
        display: block;
    }
    .u-join {
        .db;
        .fz(12px, 20px);
        color: #666;

        .u-icon-join {
            .dbi;
            .y(top);
            .mr(5px);
            .h(20px);
            .mt(2px);
            svg {
                fill: #666;
            }
        }
    }
}
.m-bio {
    .fz(13px,2);
    // border-bottom: 1px solid #e1e4e8;
    padding-bottom: 10px;
    // margin-bottom: 10px;
}
.m-link {
    padding-top:10px;
    border-top: 1px dashed #eee;
    // border-bottom: 1px solid #eee;
    a {
        .db;
        margin: 10px 0;
        .fz(13px, 20px);
        &:hover {
            color: #f39;
        }
    }
    svg {
        .size(16px);
        .mr(10px);
        .fl;
    }
}
</style>
