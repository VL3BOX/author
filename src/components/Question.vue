<template>
    <div class="m-post" v-loading="loading">
<!--        <el-timeline class="m-post-list" v-if="list && list.length">-->
<!--            <el-timeline-item-->
<!--                v-for="(item, i) in list"-->
<!--                :key="i"-->
<!--                :timestamp="item.createTime | dateFormat"-->
<!--                placement="top"-->
<!--            >-->
<!--                <h4 class="u-type">题库题目</h4>-->
<!--                <p>-->
<!--                    <a-->
<!--                        :href="postLink(item.id,item.client)"-->
<!--                        class="u-title"-->
<!--                        target="_blank"-->
<!--                        ><i class="u-client" :class="item.client">{{ item.client | clientLabel }}</i-->
<!--                        >{{ item.title || '无标题' }}</a-->
<!--                    >-->
<!--                </p>-->
<!--            </el-timeline-item>-->
<!--        </el-timeline>-->
        <!-- 列表 -->
        <div v-if="list && list.length" class="m-archive-list">
            <ul class="u-list">
                <li v-for="(item, i) in list"  :key="i + item" class="u-item">
                    <!-- 标题 -->
                    <h2 class="u-post">
                        <!-- 标题文字 -->
                        <a :href="postLink(item.id,item.client)" class="u-title" target="_blank">{{ item.title || "无标题" }}</a>
                    </h2>
                    <!-- 字段 -->
                    <div class="u-content u-desc">
                        <el-tag type="info" v-for="(tag,index) in JSON.parse(item.tags||[])" :key="'tag'+index" size="small"  class="u-tag">{{ tag }}</el-tag>
                    </div>

                    <!-- 作者 -->
                    <div class="u-misc">
                        <span class="u-date">
                            Created on
                            <time >{{ item.createTime | dateFormat }}</time>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
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
import { getQuestions } from "@/service/next.js";
import {  __clients , __Root, __OriginRoot} from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Question",
    props: [],
    data: function() {
        return {
            loading: false,
            list: [],
            total: 1,
            per: 8,
            page: 1,
            root: {
                std: __Root.slice(0,-1),
                origin: __OriginRoot.slice(0,-1),
                all : ''
            },
        };
    },
    computed: {
        params: function() {
            return {
                uid: this.uid,
                pageIndex: this.page,
                pageSize: this.per,
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
        loadData: function() {
            this.loading = true;
            getQuestions(this.params)
                .then((res) => {
                    this.list = res.data.data;
                    this.total = res.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postLink: function(id,client) {
            return this.root[client] + getLink('question', id);
        },
    },
    filters: {

        dateFormat: function(val) {
            return dateFormat(new Date(~~val * 1000));
        },
        clientLabel: function(val) {
            val = val || "std";
            return __clients[val];
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

<style lang="less"></style>
