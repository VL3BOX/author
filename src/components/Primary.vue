<template>
    <div class="m-author-body">
        <el-tabs class="m-tabs" v-model="active">
            <el-tab-pane
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :name="item.value"
            >
                <span slot="label">
                    <i :class="item.icon"></i>
                    {{item.label}}
                </span>
            </el-tab-pane>
        </el-tabs>

        <div class="m-primary">
            <component
                :is="item.component"
                v-for="item in types"
                :key="item.value"
                v-show="item.value == active"
            />
        </div>
    </div>
</template>

<script>
import Post from "@/components/Post.vue";
import Wiki from "@/components/Wiki.vue";
// import Question from "@/components/Question.vue";
// import Paper from "@/components/Paper.vue";
import Collection from "@/components/Collection.vue";
import Namespace from "@/components/Namespace.vue";
// import Plan from "@/components/item_plan.vue";
import Pz from "@/components/Pz.vue";
export default {
    name: "Primary",
    props: [],
    data: function () {
        return {
            active: "Post",
            types: [
                {
                    label: "最新作品",
                    value: "Post",
                    component: Post,
                    icon: "el-icon-collection",
                },
                {
                    label: "百科贡献",
                    value: "Wiki",
                    component: Wiki,
                    icon: "el-icon-reading",
                },
                {
                    label: "配装方案",
                    value: "Pz",
                    component: Pz,
                    icon: "el-icon-shopping-bag-1",
                },
                {
                    label: "文集小册",
                    value: "Collection",
                    component: Collection,
                    icon: "el-icon-notebook-1",
                },
                // { label: "TA的题目", value: "Question", component: Question },
                // { label: "TA的试卷", value: "Paper", component: Paper },
                // { label: "TA的清单", value: "Plan", component: Plan },
                {
                    label: "TA的铭牌",
                    value: "Namespace",
                    component: Namespace,
                    icon: "el-icon-postcard",
                },
            ],
        };
    },
    methods: {},
    components: {
        Post,
        Wiki,
        // Question,
        // Paper,
        Collection,
        Namespace,
        // Plan,
        Pz,
    },
};
</script>

<style lang="less">
</style>
