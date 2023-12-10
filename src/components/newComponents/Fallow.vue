<template>
    <div class="m-exam">
        <el-tabs class="m-tabs" v-model="active" type="card">
            <el-tab-pane v-for="item in types" :key="item.value" :label="item.label" :name="item.value" :lazy="true">
                <span slot="label">
                    {{ item.label }}
                </span>
            </el-tab-pane>
        </el-tabs>
        <div class="m-primary">
            <component :is="currentComponent" v-if="activeType === active"/>
        </div>

    </div>
</template>

<script>
import Emotions from "@/components/Emotions";
import Jokes from "@/components/Jokes";
import Face from "@/components/newComponents/Face";
import Paper from "@/components/Paper.vue";
import Question from "@/components/Question.vue";
import Body from "@/components/newComponents/Body.vue";

export default {
    name: "Fallow",
    components: {
        Emotions,
        Jokes,
        Face,
        Paper,
        Question,
        Body
    },
    data: function () {
        return {
            active: "Face",
            types: [
                {
                    label: "捏脸",
                    value: "Face",
                    component: Face,
                },
                {
                    label: "体型",
                    value: "Body",
                    component: Body,
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
                },
                {
                    label: "试卷",
                    value: "Paper",
                    component: Paper
                },
                {
                    label: "题目",
                    value: "Question",
                    component: Question
                },
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


