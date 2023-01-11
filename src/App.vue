<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            :name="name"
            slug="author"
            :root="root"
            :feedbackEnable="true"
            :withoutLeft="true"
            v-if="isAdmin"
        >
            <img slot="logo" svg-inline src="./assets/img/logo.svg" />
            <Info :uid="uid" :userdata="userdata" />
        </Breadcrumb>
        <div class="m-theme" :style="themeStyle">
            <div class="m-author" v-if="uid" :class="isAdmin?'m-author-admin':''">
                <Me />
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script>
import Me from "@/components/newComponents/Me.vue";
import Info from "@/components/Info.vue";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import { getUserInfo,getDecoration,getDecorationJson } from "@/service/cms";
import User from "@jx3box/jx3box-common/js/user";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            isAdmin: User.getInfo().group >= 128,
            themeStyle:{}
        };
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
            this.getDecoration()
        }
        
    },
    components: {
        Info,
        Me
    },
    methods: {
        showDecoration:function(val,type){
            return __imgPath + `decoration/images/${val}/${type}.png`;
        },
        //获取装扮,动态获取uid的装扮，缓存指定UID
        getDecoration() {
            let decoration_local = sessionStorage.getItem('decoration_me'+this.uid);
            if (decoration_local) {
                //解析本地缓存
                if(decoration_local == 'no'){
                    return;
                }
                let decoration_parse = JSON.parse(decoration_local)
                if (decoration_parse) {
                    this.setDecoration(decoration_parse)
                    return;
                }
            }
            getDecoration({using:1,user_id:this.uid}).then(res => {
                let decorationList=res.data.data
                if(decorationList.length==0){
                    //空 则为无主题，不再加载接口，Me界面设No
                    sessionStorage.setItem('decoration_me'+this.uid,'no')
                    return;
                }
                let type=[],decorationName=null
                for(let i=0;i<decorationList.length;i++){
                    type.push(decorationList[i].type)
                    if(i==0){
                        decorationName=decorationList[i].val
                    }
                }
                let decorationJson=sessionStorage.getItem('decoration_json')
                if(!decorationJson){
                    //加载远程json
                    getDecorationJson().then(json => {
                        let decoration_json = json.data
                        let theme = JSON.parse(JSON.stringify(decoration_json[decorationName]))
                        theme.type=type
                        this.setDecoration(theme)
                        sessionStorage.setItem('decoration_json',JSON.stringify(decoration_json))
                    })
                }else{
                    let theme=JSON.parse(decorationJson)[decorationName]
                    theme.type=type
                    this.setDecoration(theme)
                }
            })
        },
        setDecoration(theme){
            sessionStorage.setItem('decoration_me'+this.uid,JSON.stringify(theme))
            if(theme.type.indexOf('homebg') !== -1){
                let bgImg=[],w=document.body.offsetWidth
                // if(!theme.homebg_rb){
                //     bgImg.push('url('+this.showDecoration('0_TESTSAMPLE','homebg_rb')+') bottom right no-repeat fixed')
                // }
                // 背景进行4位置判断,homebg_lt>homebg_rt>homebg_lb>homebg_rb
                if(theme.homebg_lt){
                    if(w>1920){
                        bgImg.push('url('+this.showDecoration(theme.name,'homebg_lt@2x')+') top left no-repeat fixed')
                    }else{
                        bgImg.push('url('+this.showDecoration(theme.name,'homebg_lt@1x')+') top left no-repeat fixed')
                    }
                }
                if(theme.homebg_rt){
                    if(w>1920){
                        bgImg.push('url('+this.showDecoration(theme.name,'homebg_rt@2x')+') top right no-repeat fixed')
                    }else{
                        bgImg.push('url('+this.showDecoration(theme.name,'homebg_rt@1x')+') top right no-repeat fixed')
                    }
                }
                if(theme.homebg_lb){
                    if(w>1920){
                        bgImg.push('url('+this.showDecoration(theme.name,'homebg_lb@2x')+') bottom left no-repeat fixed')
                    }else{
                        bgImg.push('url('+this.showDecoration(theme.name,'homebg_lb@1x')+') bottom left no-repeat fixed')
                    }
                }
                if(theme.homebg_rb){
                    if(w>1920){
                        bgImg.push('url('+this.showDecoration(theme.name,'homebg_rb@2x')+') bottom right no-repeat fixed')
                    }else{
                        bgImg.push('url('+this.showDecoration(theme.name,'homebg_rb@1x')+')  bottom right no-repeat fixed')
                    }
                }
                this.themeStyle={
                    'background':bgImg.toString(),
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import "./assets/css/app.less";
@import './assets/css/post.less';
.m-theme{
    // .mt(64px);
    min-height: calc(100vh - @header-height);
    // min-height:100vh;
    // background: url(./assets/img-decoration/1_L1_CG.png) top left no-repeat fixed,url(./assets/img-decoration/1_R2_CG.png) bottom right no-repeat fixed;
    // background-repeat: no-repeat, no-repeat;
    // background-position: top left,bottom right;
    // background-attachment: fixed,fixed;;
    // background-size: contain;
}
// @media screen and (max-width: @phone) {
//     .m-theme{
//         background-size: 50%,50%;
//     }
// }
</style>
