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
        <div class="m-author">
            <Me :userdata="userdata" />
            <Primary :uid="uid" v-if="uid" />
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
const axios = require("axios");
const url = JX3BOX.__server + "user/info" + "?uid=";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";

import Me from "@/components/Me.vue";
import Info from "@/components/Info.vue";
import Primary from "@/components/Primary.vue";

export default {
    name: "App",
    props: [],
    data: function() {
        return {
            name: "作者",
            root: "",
            uid: 0,
            userdata: {},
        };
    },
    computed: {},
    created: function() {
        this.uid = getRewrite("uid");

        if (!this.uid) return;
        axios.get(url + this.uid).then((res) => {
            let data = res.data.data;
            this.userdata = data;
            this.name = data.name;
            this.root = "/author/" + data.uid;
        });
    },
    components: {
        Me,
        Info,
        Primary,
    },
};
</script>

<style lang="less">
.m-author {
    .mt(@header-height + @bread-height);
    max-width: 1080px;
	.auto(x);
	padding:20px 0;
}
.m-post-list{
    p,p a{
        word-break: break-all;
    }
}
</style>
