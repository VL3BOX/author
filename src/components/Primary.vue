<template>
    <div class="m-box">
        <el-tabs class="m-tabs" v-model="active" @tab-click="changeTab">
            <el-tab-pane label="最新作品" name="work">
                <Post :uid="uid" />
            </el-tab-pane>
            <el-tab-pane label="百科贡献" name="cj">
                <Cj :uid="uid" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Post from "@/components/Post.vue";
import Cj from "@/components/Cj.vue";
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
        Cj
    },
};
</script>

<style lang="less">
.m-tabs {
    padding: 20px;
    .is-active{
        .bold;
    }
    .el-tabs__nav-wrap{
        padding:0 20px;
    }
}
</style>
