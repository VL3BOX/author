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
import Battle from "@/components/Battle";
import DBM from "@/components/DBM";
export default {
    name: "Data",
    components: {
        Pz,Battle,DBM
    },
    data: function () {
        return {
            active: "Pz",
            types: [
                {
                    label: "配装方案",
                    value: "Pz",
                    component: Pz,
                },{
                    label: "战斗记录",
                    value: "Battle",
                    component: Battle,
                },{
                    label: "数据包",
                    value: "DBM",
                    component: DBM,
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


