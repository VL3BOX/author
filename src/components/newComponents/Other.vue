<template>
    <div class="m-exam">
        <el-tabs class="m-tabs" v-model="active" type="card">
            <el-tab-pane v-for="item in types" :key="item.value" :label="item.label" :name="item.value" :lazy="true">
                <span slot="label">
                    <i :class="item.icon"></i>
                    {{ item.label }}
                </span>
            </el-tab-pane>
        </el-tabs>
        <div class="m-primary">
            <component :is="currentComponent" v-if="activeType === active" />
        </div>
    </div>
</template>

<script>
import Collection from "@/components/Collection";
// import Question from "@/components/Question.vue";
// import Paper from "@/components/Paper.vue";
import Namespace from "../Namespace.vue";
export default {
    name: "Other",
    components: {
        Collection,
        Namespace,
        // Question,
        // Paper,
    },
    data: function () {
        return {
            active: "Collection",
            types: [
                {
                    label: "小册",
                    value: "Collection",
                    component: Collection,
                    icon: "el-icon-orange",
                },
                // {
                //     label: "试卷",
                //     value: "Paper",
                //     component: Paper
                // },
                // {
                //     label: "题目",
                //     value: "Question",
                //     component: Question
                // },
                {
                    label: "铭牌",
                    value: "Namespace",
                    component: Namespace,
                    icon: "el-icon-pear",
                },
            ],
        };
    },
    computed: {
        currentComponent: function () {
            return this.types.find((item) => item.value === this.active)?.component;
        },
        activeType: function () {
            return this.types.find((item) => item.value === this.active)?.value;
        },
    },
};
</script>
