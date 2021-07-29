<template>
    <div class="m-birthday">
        <div class="m-birthday-video">
            <video class="u-video" src="../assets/img/birthday/birthbg.mp4" type="video/mp4" autoplay loop muted></video>
            <i class="u-mask"></i>
        </div>
        <div class="m-letter">
            <div class="u-head">
                <div class="u-zip">{{zip}}</div>
                <div class="u-atv">
                    <img class="i-atv" :src="avatar" />
                    <span class="i-stamp"></span>
                </div>
            </div>
            <div class="u-cont">
                <img class="u-circle" src="../assets/img/birthday/bg.png" alt />
                <img class="u-light" src="../assets/img/birthday/light.png" alt />
                <div class="u-title">
                    祝
                    <b>{{name}}</b>侠士
                </div>
                <div class="u-age">
                    <span>{{age}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import { Base64 } from "js-base64";
export default {
    name: "Birthday",
    props: [],
    data: function () {
        return {
            zip: "123456",
            age: 26,
        };
    },
    computed: {
        userdata: function () {
            return this.$store.state.userdata;
        },
        avatar: function () {
            return showAvatar(this.userdata?.user_avatar, 140);
        },
        name: function () {
            return this.userdata?.display_name;
        },
    },
    methods: {},
    mounted: function () {
        // let test = Base64.encode('1987-05-12@34')   //MTk4Ny0wNS0xMkAzNA==
        let code = this.$route.query.code && Base64.decode(this.$route.query.code) || Base64.decode('MTk4Ny0wNS0xMkAzNA==')
        let birth = code.split('@')[0]
        let [year,month,date] = birth.split('-')
        this.age = code.split('@')[1] || 1
        this.zip = year.slice(-2,) + month + date
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/birthday.less";
</style>
