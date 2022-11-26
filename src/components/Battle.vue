<template>
    <div class="m-post" v-loading="loading">
        <div v-if="list && list.length" class="m-archive-list">
            <ul class="u-list">
                <li v-for="(item, i) in list"  :key="i + item" class="u-item">
                    <!-- 标题 -->
                    <h2 class="u-post">
                        <!-- 标题文字 -->
                        <a :href="postLink(item.id)" class="u-title" target="_blank">{{ item.title || "无标题" }}</a>
                    </h2>
                    <!-- 日期 -->
                    <div class="u-misc">
                        <span class="u-date">
                            Updated on
                            <time >{{ item.updated | dateFormat }}</time>
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
            :current-page.sync="pageIndex"
            :page-size="per"
        >
        </el-pagination>
    </div>
</template>

<script>
import dateFormat from "../utils/dateFormat";
import { getBattleList } from "@/service/author.js";
export default {
    props: [],
    data: function() {
        return {
            loading: false,
            list: [],
            total: 1,
            per : 8,
            pageIndex : 1
        };
    },
    computed : {
        params : function (){
            return {
                user_id: this.uid,
                pageIndex: this.pageIndex,
            }
        },
        uid : function (){
            return this.$store.state.uid
        }
    },
    methods: {
        loadData: function() {
            this.loading = true;
            getBattleList(this.params)
                .then((res) => {
                    this.list = res.data.data.list;
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postLink: function(id) {
           return "/battle/#/combat/" + id;
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(~~val*1000));
        },
    },
    watch : {
        params : {
            deep:true,
            immediate:true,
            handler : function (){
                this.loadData();
            }
        }
    },
    mounted: function() {

    },
};
</script>
