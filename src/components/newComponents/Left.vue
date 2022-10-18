<template>
    <div class="m-author-info">
        <div class="m-top">
            <div class="u-title">
                TA的作品
            </div>
            <el-tabs class="m-tabs" v-model="active" stretch>
                <el-tab-pane v-for="item in types" :key="item.value" :label="item.label" :name="item.value" :lazy="true">
                <span slot="label">
                    {{ item.label }}
                </span>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="m-primary">
            <component :is="currentComponent" v-if="activeType === active"/>
        </div>

    </div>
</template>

<script>
import Post from "@/components/Post.vue";
import Wiki from "@/components/Wiki.vue";
import Question from "@/components/Question.vue";
import Paper from "@/components/Paper.vue";
import Collection from "@/components/Collection.vue";
import Namespace from "@/components/Namespace.vue";
import Jokes from "@/components/Jokes.vue";
import Emotions from "@/components/Emotions.vue";
import Pz from "@/components/Pz.vue";

export default {
    name: "Left",
    components: {
        Post,
        Wiki,
        Question,
        Paper,
        Collection,
        Namespace,
        Pz,
        Jokes,
        Emotions,
    },
    data: function () {
        return {
            active: "Post",
            types: [
                {
                    label: "最新",
                    value: "Post",
                    component: Post,
                },
                {
                    label: "百科",
                    value: "Wiki",
                    component: Wiki,
                },
                {
                    label: "配装",
                    value: "Pz",
                    component: Pz,
                },
                {
                    label: "文集",
                    value: "Collection",
                    component: Collection,
                },

                {
                    label: "题目",
                    value: "Question",
                    component: Question
                },
                {
                    label: "试卷",
                    value: "Paper",
                    component: Paper
                },
                {
                    label: "铭牌",
                    value: "Namespace",
                    component: Namespace,
                },
                {
                    label: "趣图",
                    value: "Emotions",
                    component: Emotions,
                },
                {
                    label: "骚话",
                    value: "Jokes",
                    component: Jokes,
                }
            ],
        };
    },
    computed: {
        currentComponent: function () {
            return this.types.find((item) => item.value === this.active).component;
        },
        activeType: function () {
            return this.types.find((item) => item.value === this.active).value;
        },
    },

}
</script>

<style lang="less">
@import "../../assets/css/newCss/left.less";
@import "../../assets/css/newCss/content.less";
</style>
