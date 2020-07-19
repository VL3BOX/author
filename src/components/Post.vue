<template>
    <div class="m-post" v-if="list !== null">
        <el-timeline class="m-post-list">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.post.post_modified | dateFormat"
                placement="top"
            >
                    <h4 class="u-type">{{ item.post_type_name }}</h4>
                    <p>
                        <a
                            :href="postLink(item.post.post_type,item.post.ID)"
                            class="u-title"
                            target="_blank"
                            >{{ item.post.post_title }}</a
                        >
                    </p>
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
import { getRewrite,postLink } from "@jx3box/jx3box-common/js/utils";
import dateFormat from '../utils/dateFormat'
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
        postLink : function (type,pid){
            return postLink(type,pid)
        }
    },
    filters : {
        dateFormat : function (val){
            return dateFormat(new Date(val))
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
    .u-type{
        margin:0;
    }
    .u-title{
        &:hover{
            color:@pink;
        }
    }
}
.m-post-list{
    padding-left:20px;
}
.m-author-pages {
    .x;
    max-width: 100%;
    overflow-x: auto;
}
</style>
