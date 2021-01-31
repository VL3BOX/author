<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list && list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.post.post_modified | dateFormat"
                placement="top"
            >
                <h4 class="u-type">文集小册</h4>
                <p>
                    <a
                        :href="postLink(item.post.post_type, item.post.ID)"
                        class="u-title"
                        target="_blank"
                        >{{ item.post.post_title || "无标题" }}</a
                    >
                </p>
            </el-timeline-item>
        </el-timeline>
        <el-alert v-else title="没有找到相关条目" type="info" show-icon>
        </el-alert>

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
import { getLink } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";
import { getPlans } from "@/service/helper.js";
export default {
    props: ["uid"],
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
            getPlans({
                uid: this.uid,
                page: i,
                limit: 10,
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
        postLink: function(id) {
            return getLink("item_plan", id);
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    mounted: function() {
        this.changePage();
    },
};
</script>
