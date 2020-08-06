<template>
    <div class="m-info">
        <el-button
            type="danger"
            size="mini"
            icon="el-icon-turn-off-microphone"
            @click="ban"
            v-if="!userdata.status"
            >禁言</el-button
        >
        <el-button
            type="primary"
            size="mini"
            icon="el-icon-microphone"
            @click="rmban"
            v-else
            >解除禁言</el-button
        >
    </div>
</template>

<script>
import axios from "axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "Info",
    props: ["uid","userdata"],
    data: function() {
        return {};
    },
    computed: {},
    methods: {
        ban: function() {
            this.$alert("确定【禁言】吗？", "消息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    if (action == "confirm") {
                        axios
                            .post(
                                __server + "user/admin",
                                {
                                    ID: this.uid,
                                    user_status: 1,
                                },
                                {
                                    withCredentials: true,
                                }
                            )
                            .then((res) => {
                                this.$message({
                                    message: "操作成功",
                                    type: "success",
                                });
                            });
                    }
                },
            });
        },
        rmban: function() {
            this.$alert("确定【解除禁言】吗？", "消息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    if (action == "confirm") {
                        axios
                            .post(
                                __server + "user/admin",
                                {
                                    ID: this.uid,
                                    user_status: 0,
                                },
                                {
                                    withCredentials: true,
                                }
                            )
                            .then((res) => {
                                this.$message({
                                    message: "操作成功",
                                    type: "success",
                                });
                            });
                    }
                },
            });
        },
    },
    mounted: function() {},
};
</script>

<style lang="less">
.m-info {
    .fr;
}
</style>
