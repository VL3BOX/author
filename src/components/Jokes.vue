<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list && list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.created_at | dateFormat"
                placement="top"
            >
                <h4 class="u-type">骚话</h4>
                <p>
                    <a
                        :href="postLink(item.id)"
                        class="u-title"
                        target="_blank"
                        >{{ item.content || "无标题" }}</a
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
import dayjs from 'dayjs'
import { getUserJokes } from "@/service/cms.js";
export default {
    props: [],
    data: function() {
        return {
            loading: false,
            list: [],
            total: 1,
            per : 10,
            page : 1
        };
    },
    computed : {
        params : function (){
            return {
                user_id: this.uid,
                page: this.page,
                per: this.per
            }
        },
        uid : function (){
            return this.$store.state.uid
        }
    },
    methods: {
        loadData: function() {
            this.loading = true;
            getUserJokes(this.params)
                .then((res) => {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postLink: function(id) {
            return getLink("joke", id);
        },
    },
    filters: {
        dateFormat: function(val) {
            return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
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
