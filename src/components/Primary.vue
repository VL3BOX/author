<template>
    <div class="m-box">
        <el-tabs class="m-tabs" v-model="active" @tab-click="changeTab">
            <el-tab-pane label="最新作品" name="work">
                <Post :uid="uid" />
            </el-tab-pane>
            <!-- <el-tab-pane label="收藏列表" name="tab_2"></el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
import Post from "@/components/Post.vue";
export default {
    name: "Primary",
    props: ["uid"],
    data: function() {
        return {
            active: "work",
        };
    },
    methods: {
        changeTab(tab, event) {
            // console.log(tab, event)
        },
    },
    components: {
        Post,
    },
};
</script>

<style lang="less">
.m-tabs {
    padding: 20px;
}
</style>
