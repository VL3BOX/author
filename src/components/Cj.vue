<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.updated | dateFormat"
                placement="top"
            >
                <h4 class="u-type">{{ item.type | postType }}</h4>
                <p>
                    <a
                        :href="postLink(item.type, item.source_id)"
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
            @current-change="changePage"
        >
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
import dateFormat from "../utils/dateFormat";
import { __helperUrl, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
const API = __helperUrl + "api/wiki/posts";
const typemap = {
    achievement: "成就百科",
    item: "物品百科",
};

export default {
    name: "Cj",
    props: ['uid'],
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
                        user_id: this.uid,
                        page: i,
                    },
                    headers: {
                        Accept: "application/prs.helper.v2+json",
                    },
                })
                .then((res) => {
                    this.list = res.data.data.data;
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
            let _type = type == "achievement" ? "cj" : type;
            return __Root + _type + "/#/view/" + pid;
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(~~val*1000));
        },
        postType: function(type) {
            return typemap[type];
        },
    },
    mounted: function() {
        this.changePage();
    },
};
</script>

<style lang="less"></style>
