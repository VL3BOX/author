<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list && list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.createTime | dateFormat"
                placement="top"
            >
                <h4 class="u-type">题库试卷</h4>
                <p>
                    <a
                        :href="postLink(item.id)"
                        class="u-title"
                        target="_blank"
                        >{{ item.title || '无标题' }}</a
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
import { getPapers } from "@/service/next.js";

export default {
    name: "Paper",
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
            getPapers(this.params)
                .then((res) => {
                    this.list = res.data.data;
                    this.total = res.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postLink: function(id) {
            return getLink("paper", id);
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(~~val * 1000));
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
