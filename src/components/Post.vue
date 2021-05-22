<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list && list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.post_modified | dateFormat"
                placement="top"
            >
                <h4 class="u-type">{{ item.post_type | typeFormat }}</h4>
                <p>
                    <a
                        :href="postLink(item.post_type, item.ID)"
                        class="u-title"
                        target="_blank"
                        >{{ item.post_title || "无标题" }}</a
                    >
                </p>
            </el-timeline-item>
        </el-timeline>
        <el-alert v-else title="没有找到相关条目" type="info" show-icon>
        </el-alert>

        <el-pagination
            class="m-author-pages"
            background
            :hide-on-single-page="true"
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="page"
            :page-size="per"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";
import { getPosts } from "@/service/cms.js";
import { __postType } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    props: [],
    data: function() {
        return {
            loading: false,
            list: [],
            total: 1,
            per: 10,
            page: 1,
        };
    },
    computed: {
        params: function() {
            return {
                author: this.uid,
                page: this.page,
                per: this.per,
            };
        },
        uid : function (){
            return this.$store.state.uid
        },
        userdata: function() {
            return this.$store.state.userdata;
        },
    },
    methods: {
        loadData: function(i = 1) {
            this.loading = true;
            getPosts(this.params)
                .then((res) => {
                    this.list = res.data.data.list || [];
                    this.total = res.data.data.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postLink: function(type, id) {
            return getLink(type, id);
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        typeFormat: function(type) {
            return __postType[type];
        },
    },
    watch: {
        params: {
            deep: true,
            immediate: true,
            handler: function() {
                this.loadData();
            },
        },
    },
    mounted: function() {},
};
</script>

<style lang="less">
.m-post {
    padding: 20px;
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
