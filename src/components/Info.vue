<template>
    <div class="m-info" v-if="isAdmin">
        <el-button
            type="danger"
            size="mini"
            icon="el-icon-turn-off-microphone"
            @click="ban(true)"
            v-if="!status"
            >禁言</el-button
        >
        <el-button
            type="success"
            size="mini"
            icon="el-icon-microphone"
            @click="ban(false)"
            v-else
            >解除禁言</el-button
        >
    </div>
</template>

<script>
import axios from "axios";
import User from "@jx3box/jx3box-common/js/user";
import { muteUser } from "@/service/helper.js";
import { checkUser } from "@/service/server.js";
export default {
    name: "Info",
    props: ["uid", "userdata"],
    data: function() {
        return {
            isAdmin: User.getInfo().group >= 64,
        };
    },
    computed: {
        status: function() {
            return this.userdata.status;
        },
        name: function() {
            return this.userdata.name;
        },
    },
    methods: {
        ban: function(status) {
            let tip = status ? "禁言" : "解除禁言";
            this.$alert(`确定${tip}${this.name}吗？`, "消息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    if (action == "confirm") {
                        checkUser(this.uid, ~~status).then((res) => {
                            this.$message({
                                message: "操作成功",
                                type: "success",
                            });
                            location.reload();
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
