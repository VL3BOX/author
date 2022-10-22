<template>
    <div class="m-post" v-loading="loading">
<!--        <el-timeline class="m-post-list" v-if="list && list.length">-->
<!--            <el-timeline-item-->
<!--                v-for="(item, i) in list"-->
<!--                :key="i"-->
<!--                :timestamp="item.updated | dateFormat"-->
<!--                placement="top"-->
<!--            >-->
<!--                <h4 class="u-type">文集小册</h4>-->
<!--                <p>-->
<!--                    <a-->
<!--                        :href="postLink(item.id)"-->
<!--                        class="u-title"-->
<!--                        target="_blank"-->
<!--                        >{{ item.title || "无标题" }}</a-->
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
                        <a :href="postLink(item.id)" class="u-title" target="_blank">{{ item.title || "无标题" }}</a>
                    </h2>
                    <!-- 字段 -->
                    <div class="u-content u-desc">
                        {{ item.excerpt || item.title }}
                    </div>

                    <!-- 作者 -->
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
            :current-page.sync="page"
            :page-size="per"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";
import { getCollections } from "@/service/helper.js";
export default {
    props: [],
    data: function() {
        return {
            loading: false,
            list: [],
            total: 1,
            per : 8,
            page : 1
        };
    },
    computed : {
        params : function (){
            return {
                user_id: this.uid,
                page: this.page,
                limit: this.per
            }
        },
        uid : function (){
            return this.$store.state.uid
        }
    },
    methods: {
        loadData: function() {
            this.loading = true;
            getCollections(this.params)
                .then((res) => {
                    this.list = res.data.data.data;
                    this.total = res.data.data.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postLink: function(id) {
            return getLink("collection", id);
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
