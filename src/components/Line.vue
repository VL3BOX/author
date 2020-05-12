<template>
    <div class="m-Line" v-if="list !== null">
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
                        <a :href="JX3BOX.__Root + '?p=' + item.post.ID" class="title" target="_blank">{{
                            item.post.post_title
                        }}</a>
                    </p>
                </el-card>
            </el-timeline-item>
        </el-timeline>

        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
        >
        </el-pagination>
    </div>
</template>

<script>
const { JX3BOX,Utils } = require('@jx3box/jx3box-common')
const axios = require("axios");
const API = JX3BOX.__server + "post/list";

export default {
    name: "mLine",
    props: ["uId"],
    data: function() {
        return {
            list: null,
            total: null,
            page: 1,
            // uid : 0
            JX3BOX
        };
    },
    methods: {
        loadData: function() {
            let uid = Utils.getQuery('uid')
            axios
                .get(API, {
                    params: {
                        author: uid,
                        page: this.page,
                    },
                })
                .then((res) => {
                    let data = res.data.data.list;
                    data.forEach(function(item, i) {
                        item.post_type_name = JX3BOX.__postType[item.post.post_type];
                    });
                    this.list = data;
                    this.total = res.data.data.total;
                });
        },
        changePage(page) {
            this.page = page
            this.loadData()
        },
    },
    mounted: function() {
        this.loadData()
    },
};
</script>

<style lang="less">
.t-year {
    span {
        font-size: 16px;
        padding: 0 10px;
        color: #586069;
        background-color: #fff;
    }
    &:after {
        position: absolute;
        top: 12px;
        right: 0;
        left: 0;
        z-index: -1;
        height: 1px;
        content: "";
        background-color: #eaecef;
    }
}
</style>
<style lang="less" scoped>
.item + .item {
    border-top: 1px solid #e1e4e8;
}
.item {
    list-style: none;
    border-left: 2px solid #e1e4e8;
    position: relative;
    margin-left: 20px;
    padding: 24px 0 24px 20px;
    a {
        color: #0366d6;
        &:hover {
            text-decoration: underline;
        }
    }

    .icon {
        .pa;
        .lt(0);
        // float: left;
        width: 32px;
        height: 32px;
        margin-top: -5px;
        margin-left: -39px;
        line-height: 28px;
        color: #24292e;
        text-align: center;
        background-color: #f6f8fa;
        border: 2px solid #fff;
        border-radius: 50%;
    }
    .title {
        display: inline-block;
        margin-bottom: 5px;
    }
    .detail {
        font-size: 13px;
        color: #586069;
        .type {
            margin-right: 10px;
            color: #586069;
        }
    }
}
.showmore {
    width: 100%;
}
</style>
