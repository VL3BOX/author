<template>
    <div class="m-post" v-loading="loading">
        <el-timeline class="m-post-list" v-if="list && list.length">
            <el-timeline-item
                v-for="(item, i) in list"
                :key="i"
                :timestamp="item.updated_at | dateFormat"
                placement="top"
            >
                <h4 class="u-type">配装方案</h4>
                <p>
                    <a
                        :href="postLink(item.id)"
                        class="u-title"
                        target="_blank"
                        ><i class="u-client" :class="item.client">{{item.client | clientLabel}}</i>{{ item.title || "无标题" }}</a
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
import { getUserPz } from "@/service/cms.js";
import clients from '@/assets/data/clients.json'
export default {
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
                user_id: this.uid,
                page: this.page,
                per: this.per,
            };
        },
        uid : function (){
            return this.$store.state.uid
        },
    },
    methods: {
        loadData: function(i = 1) {
            this.loading = true;
            getUserPz(this.params)
                .then((res) => {
                    this.list = res.data.data.list || [];
                    this.total = res.data.data.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postLink: function(id) {
            return getLink('pz', id);
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        clientLabel : function (val){
            val = val || 'std'
            return clients[val]
        }
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

