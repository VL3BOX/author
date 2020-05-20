<template>
    <div class="m-post" v-if="list !== null">
        <el-timeline>
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.post_modified"
                placement="top"
            >
                <el-card>
                    <h4>{{ item.post_type_name }}</h4>
                    <p>
                        <a
                            :href="JX3BOX.__Root + '?p=' + item.post.ID"
                            class="u-title"
                            target="_blank"
                            >{{ item.post.post_title }}</a
                        >
                    </p>
                </el-card>
            </el-timeline-item>
        </el-timeline>

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
import { getRewrite } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "mLine",
    props: ["uid"],
    data: function() {
        return {
            list: null,
            total: null,
            page: 1,
            // uid : 0
            JX3BOX,
        };
    },
    methods: {
        loadData: function(i = 1) {
            axios
                .get(API, {
                    params: {
                        author: this.uid,
                        page: i,
                    },
                })
                .then((res) => {
                    let data = res.data.data.list;
                    data.forEach(function(item, i) {
                        item.post_type_name =
                            JX3BOX.__postType[item.post.post_type];
                    });
                    this.list = data;
                    this.total = res.data.data.total;
                });
        },
        changePage(i) {
            this.loadData(i);
            window.scrollTo(0, 0);
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
    .u-title{
        &:hover{
            color:@pink;
        }
    }
}
.m-author-pages {
    .x;
    max-width: 100%;
    overflow-x: auto;
}
</style>
