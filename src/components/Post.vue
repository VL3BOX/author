<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list && list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.post.post_modified | dateFormat"
                placement="top"
            >
                <h4 class="u-type">{{ item.post.post_type | typeFormat }}</h4>
                <p>
                    <a
                        :href="postLink(item.post.post_type, item.post.ID)"
                        class="u-title"
                        target="_blank"
                        >{{ item.post.post_title }}</a
                    >
                </p>
            </el-timeline-item>
        </el-timeline>
        <el-alert v-else title="没有找到相关条目" type="info" show-icon>
        </el-alert>

        <el-pagination
            class="m-author-pages"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
            :hide-on-single-page="true"
        >
        </el-pagination>
    </div>
</template>

<script>
const { JX3BOX, Utils } = require("@jx3box/jx3box-common");
const axios = require("axios");
const API = JX3BOX.__server + "post/list";
import { getRewrite, postLink } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";
export default {
    name: "mLine",
    props: ["uid"],
    data: function() {
        return {
            loading: false,
            list: [],
            total: 1,
        };
    },
    methods: {
        loadData: function(i = 1) {
            this.loading = true;
            axios
                .get(API, {
                    params: {
                        author: this.uid,
                        page: i,
                    },
                })
                .then((res) => {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage(i) {
            this.loadData(i);
            window.scrollTo(0, 0);
        },
        postLink: function(type, pid) {
            return postLink(type, pid);
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        typeFormat: function(type) {
            return JX3BOX.__postType[type];
        },
    },
    mounted: function() {
        this.changePage();
    },
};
</script>

<style lang="less">
.m-post {
    padding: 20px 20px 20px 0;
    .el-tabs__item {
        .bold;
    }
    .u-type {
        margin: 0;
    }
    .u-title {
        &:hover {
            color: @pink;
        }
    }
}
.m-post-list {
    padding-left: 20px;
}
.m-author-pages {
    .x;
    max-width: 100%;
    overflow-x: auto;
}
</style>
