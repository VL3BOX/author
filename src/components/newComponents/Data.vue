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
import Pz from "@/components/Pz";
import Battle from "@/components/Battle"
export default {
    name: "Data",
    components: {
        Pz,Battle
    },
    data: function () {
        return {
            active: "Pz",
            types: [
                {
                    label: "配装",
                    value: "Pz",
                    component: Pz,
                },{
                    label: "战斗",
                    value: "Battle",
                    component: Battle,
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


