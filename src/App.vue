<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            :name="name"
            slug="author"
            :root="root"
            :feedbackEnable="true"
            :withoutLeft="true"
        >
            <img slot="logo" svg-inline src="./assets/img/logo.svg" />
            <Info :uid="uid" :userdata="userdata" />
        </Breadcrumb>
        <router-view v-if="uid"></router-view>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import axios from "axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "App",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
        userdata: function() {
            return this.$store.state.userdata;
        },
        uid: function() {
            return this.$store.state.uid;
        },
        root : function (){
            return "/author/" + this.uid
        },
        name : function (){
            return this.$store.state.userdata.name || '魔盒'
        }
    },
    created: function() {
        this.$store.state.uid = getRewrite("uid");
        if (!this.uid) return;
        axios.get(__server + "user/info?uid=" + this.uid).then((res) => {
            this.$store.state.userdata = res.data.data;
        });
    },
    components: {
        Info,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
