<!--
 * @Author: iRuxu
 * @Date: 2022-05-02 10:53:27
 * @LastEditTime: 2022-07-21 21:38:30
 * @Description:
-->
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
        <div class="m-author" v-if="uid">
            <Me />
            <Primary />
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Me from "@/components/Me.vue";
import Primary from "@/components/Primary.vue";
import Info from "@/components/Info.vue";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import { getUserInfo } from "@/service/cms";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {
        userdata: function () {
            return this.$store.state.userdata;
        },
        uid: function () {
            return this.$store.state.uid;
        },
        root: function () {
            return "/author/" + this.uid;
        },
        name: function () {
            return this.$store.state.userdata.display_name || "魔盒";
        },
    },
    created: function () {
        this.$store.state.uid = getRewrite("uid");
        if (this.uid) {
            getUserInfo(this.uid).then((res) => {
                this.$store.state.userdata = res.data.data;
            });
        }
    },
    components: {
        Info,
        Me,
        Primary,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
@import './assets/css/post.less';
</style>
