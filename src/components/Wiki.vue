<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.created_at"
                placement="top"
            >
                <h4 class="u-type">{{ item.type | typeFormat }}</h4>
                <p>
                    <a
                        :href="postLink(item.wiki_id)"
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
            :total="total"
            :page-size="per"
            @current-change="changePage"
            :hide-on-single-page="true"
        >
        </el-pagination>
    </div>
</template>

<script>
import {__bb,__Root} from '@jx3box/jx3box-common/js/jx3box.json'
import axios from 'axios'
import {types} from '@jx3box/jx3box-data/data/common/wiki.json'
const API = __bb + 'api/wiki/user_item/'
export default {
    name: "Wiki",
    props: ["uid"],
    data: function() {
        return {
            loading : false,
            list: [],
            total: 1,
            per : 10,
            types
        };
    },
    methods: {
        loadData: function(i = 1) {
            this.loading = true;
            axios
                .get(API, {
                    params: {
                        uid: this.uid,
                        page: i,
                        size:this.per,
                        status : 1,
                        anonymous:0
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
        postLink: function(pid) {
            return __Root + 'wiki/?pid=' + pid
        },
    },
    filters: {
        typeFormat : function (type){
            return types[type];
        }
    },
    mounted: function() {
        this.changePage();
    },
};
</script>

<style lang="less">
</style>
