<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.createTime | dateFormat"
                placement="top"
            >
                <h4 class="u-type">题库题目</h4>
                <p>
                    <a
                        :href="postLink(item.id)"
                        class="u-title"
                        target="_blank"
                        >{{ item.title }}</a
                    >
                </p>
            </el-timeline-item>
        </el-timeline>

        <el-pagination
            class="m-author-pages"
            background
            layout="prev, pager, next"
            :hide-on-single-page="true"
            :total="total"
            :page-size="per"
            @current-change="changePage"
        >
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
import dateFormat from "../utils/dateFormat";
import { __next,__Root } from "@jx3box/jx3box-common/js/jx3box.json";
const API = __next + "api/question/public-list";
// const API = "/api/question/public-list";

export default {
    name: "Question",
    props: ['uid'],
    data: function() {
        return {
            loading: false,
            list: [],
            total: 1,
            per : 10,
        };
    },
    methods: {
        loadData: function(i = 1) {
            this.loading = true;
            axios
                .get(API, {
                    params: {
                        uid: this.uid,
                        pageIndex: i,
                        pageSize : this.per
                    },
                })
                .then((res) => {
                    this.list = res.data.data;
                    this.total = res.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage(i) {
            this.loadData(i);
            window.scrollTo(0, 0);
        },
        postLink: function(pid) {
            return __Root + 'exam' + "/#/question/" + pid;
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(~~val*1000));
        },
    },
    mounted: function() {
        this.loadData(1);
    },
};
</script>

<style lang="less"></style>
