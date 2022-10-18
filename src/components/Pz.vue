<template>
    <div class="m-post" v-loading="loading">
<!--        <el-timeline class="m-post-list" v-if="list && list.length">-->
<!--            <el-timeline-item-->
<!--                v-for="(item, i) in list"-->
<!--                :key="i"-->
<!--                :timestamp="item.updated_at | dateFormat"-->
<!--                placement="top"-->
<!--            >-->
<!--                <h4 class="u-type">配装方案</h4>-->
<!--                <p>-->
<!--                    <a :href="postLink(item.id, item.client)" class="u-title" target="_blank"-->
<!--                        ><i class="u-client" :class="item.client">{{ item.client | clientLabel }}</i-->
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
                        <a :href="postLink(item.id, item.client)" class="u-title" target="_blank">{{ item.title || "无标题" }}</a>
                    </h2>
                    <!-- 字段 -->
                    <div class="u-content u-desc">
                        <i :class="item.client" class="u-client">{{ item.client | clientLabel }}</i>
                        {{ item.desc || "这个作者很懒,什么都没有留下" }}
                    </div>

                    <!-- 作者 -->
                    <div class="u-misc">
<!--                        <img class="u-author-avatar" :src="item.pz_author_info | showAvatar" :alt="item.pz_author_info | showNickname" />-->
<!--                        <a class="u-author-name" :href="item.user_id | authorLink" target="_blank">{{ item.pz_author_info | showNickname }}</a>-->
                        <span class="u-date">
                            Updated on
                            <time >{{ item.updated_at | dateFormat }}</time>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <el-alert v-else title="没有找到相关条目" type="info" show-icon> </el-alert>

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
import {getLink, showAvatar,authorLink,} from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";
import { getUserPz } from "@/service/cms.js";
import { __postType, __clients, __Root, __OriginRoot } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    props: [],
    data: function() {
        return {
            loading: false,
            list: [],
            total: 1,
            per: 6,
            page: 1,
            root: {
                std: __Root.slice(0,-1),
                origin: __OriginRoot.slice(0,-1),
            },
        };
    },
    computed: {
        params: function() {
            return {
                user_id: this.uid,
                page: this.page,
                per: this.per,
                // client: this.client,
            };
        },
        uid: function() {
            return this.$store.state.uid;
        },
        client: function() {
            return this.$store.state.client;
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
        postLink: function (id, client) {
            return this.root[client] + getLink('pz', id);
        },
    },
    filters: {
        authorLink,
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        showMark: function(val) {
            return mark_map[val] || val;
        },
        showAvatar: function(userinfo) {
            return showAvatar(userinfo?.user_avatar);
        },
        showNickname : function (userinfo){
            return userinfo?.display_name || '匿名'
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
