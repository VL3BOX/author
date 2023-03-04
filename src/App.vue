<template>
    <div id="app">
        <Header></Header>
        <!-- <Breadcrumb :name="name" slug="author" :root="root" :feedbackEnable="true" :withoutLeft="true" v-if="isAdmin">
            <img slot="logo" svg-inline src="./assets/img/logo.svg" />
            <Info :uid="uid" :userdata="userdata" />
        </Breadcrumb> -->
        <div class="m-theme" :style="themeStyle">
            <div class="m-author" v-if="uid" :class="isAdmin ? 'm-author-admin' : ''">
                <Me :decorationMe="decorationMe" :honor="honor" />
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script>
import Me from "@/components/newComponents/Me.vue";
// import Info from "@/components/Info.vue";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import { getUserInfo, getDecoration, getDecorationJson, getHonorJson } from "@/service/cms";
import User from "@jx3box/jx3box-common/js/user";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
const DECORATION_JSON = "decoration_json";
const DECORATION_KEY = "decoration_me";
const HONOR_KEY = "honor_me";
const HONOR_IMG_KEY = "honor_img";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            isAdmin: User.getInfo().group >= 128,
            themeStyle: {},
            decorationMe: { status: false },
            honor: null,
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
            this.getDecoration();
        }
    },
    components: {
        // Info,
        Me,
    },
    methods: {
        //获取装扮,动态获取uid的装扮，缓存指定UID
        getDecoration() {
            let decoration_local = sessionStorage.getItem(DECORATION_KEY + this.uid);
            let honor_local = sessionStorage.getItem(HONOR_IMG_KEY + this.uid);
            if (honor_local) {
                // this.honor = honor_local;
                this.getHonor(honor_local);
            }
            if (decoration_local) {
                //解析本地缓存
                let decoration_parse = JSON.parse(decoration_local);
                if (!decoration_parse.status) return;

                if (decoration_parse) {
                    this.setDecoration(decoration_parse);
                    return;
                }
            }
            getDecoration({ using: 1, user_id: this.uid }).then((res) => {
                let decorationList = res.data.data;
                //筛选个人装扮
                let decoration = decorationList.find((item) => item.type == "homebg");
                //筛选称号
                let honor = decorationList.find((item) => item.type == "honor");
                if (honor) {
                    sessionStorage.setItem(HONOR_KEY + this.uid, JSON.stringify(honor));
                    // this.honor = honor.val;
                    this.getHonor(honor);
                }
                if (!decoration) {
                    //空 则为无主题，不再加载接口，Me界面设No
                    sessionStorage.setItem(DECORATION_KEY + this.uid, JSON.stringify({ status: false }));
                    return;
                }
                let decorationJson = sessionStorage.getItem(DECORATION_JSON);
                if (!decorationJson) {
                    //加载远程json，用于颜色配置及主题存在部位判断
                    getDecorationJson().then((json) => {
                        let decoration_json = json.data;
                        let theme = JSON.parse(JSON.stringify(decoration_json[decoration.val]));
                        theme.status = true;
                        sessionStorage.setItem(DECORATION_KEY + this.uid, JSON.stringify(theme));
                        this.setDecoration(theme);
                        //缓存远程JSON文件
                        sessionStorage.setItem(DECORATION_JSON, JSON.stringify(decoration_json));
                    });
                } else {
                    let theme = JSON.parse(decorationJson)[decoration.val];
                    theme.status = true;
                    sessionStorage.setItem(DECORATION_KEY + this.uid, JSON.stringify(theme));
                    this.setDecoration(theme);
                }
            });
        },
        getHonor(data) {
            let honor_img_local = sessionStorage.getItem(HONOR_IMG_KEY + this.uid);
            if (honor_img_local) {
                //解析本地缓存
                let honor_img_parse = JSON.parse(honor_img_local);
                if (!honor_img_parse == "no") return;
                this.honor = honor_img_parse;
                return;
            }
            getHonorJson().then((res) => {
                let honorList = res.data;
                //过滤称号信息
                let honorConfig = honorList[data.val];
                //正则取出前缀
                let prefix = honorConfig.prefix;
                let regPrefix = honorConfig.prefix.match(/(?<=\{)(.+?)(?=\})/g);
                let ranking = honorConfig.ranking;
                let honorStr = honorConfig.year || "";
                if (regPrefix) {
                    honorStr = honorStr + (data[regPrefix[0]] || "");
                } else {
                    honorStr = honorStr + prefix;
                }
                //排名处理
                if (ranking.length > 0) {
                    data.imgIndex = 0;
                    for (let i = 0; i < ranking.length; i++) {
                        //处在范围内取数组第三个值进行称号拼接
                        if (data.ranking != undefined && inRange(Number(data.ranking), ranking[i][0], ranking[i][1])) {
                            data.imgIndex = i;
                            let str = ranking[i][2];
                            //正则取出需替换值，如果没有则直接拼接
                            let regStr = str.match(/(?<=\{)(.+?)(?=\})/g);
                            if (regStr) {
                                //包含花括号替换
                                honorStr = honorStr + str.replace(/\{(.+?)\}/g, data[regStr[0]]);
                            } else {
                                honorStr = honorStr + str;
                            }
                            break;
                        }
                    }
                }
                data.honor = honorStr + honorConfig.suffix;
                data.color = honorConfig.color;
                data.ext = honorConfig.ext;
                data.isHave = true;
                data.isImgIndex = honorConfig.ranking.length > 0 ? true : false;
                sessionStorage.setItem(HONOR_IMG_KEY + this.uid, JSON.stringify(data));
                this.honor = data;
            });
        },
        showDecoration: function (val, type) {
            return __imgPath + `decoration/images/${val}/${type}.png`;
        },
        setDecoration(theme) {
            this.decorationMe = theme;
            let bgImg = [],
                w = document.body.offsetWidth;
            // if(!theme.homebg_rb){
            //     bgImg.push('url('+this.showDecoration('0_TESTSAMPLE','homebg_rb')+') bottom right no-repeat fixed')
            // }
            // 背景进行4位置判断,homebg_lt>homebg_rt>homebg_lb>homebg_rb
            let size = 1;
            if (w > 1920) {
                size = 2;
            }
            if (theme.homebg_lt) {
                bgImg.push(`url(${this.showDecoration(theme.name, `homebg_lt@${size}x`)} ) top left no-repeat fixed`);
            }
            if (theme.homebg_rt) {
                bgImg.push(`url( ${this.showDecoration(theme.name, `homebg_rt@${size}x`)}) top right no-repeat fixed`);
            }
            if (theme.homebg_lb) {
                bgImg.push(`url(${this.showDecoration(theme.name, `homebg_lb@${size}x`)}) bottom left no-repeat fixed`);
            }
            if (theme.homebg_rb) {
                bgImg.push(
                    `url(${this.showDecoration(theme.name, `homebg_rb@${size}x`)}) bottom right no-repeat fixed`
                );
            }
            this.themeStyle = {
                background: bgImg.toString(),
            };
        },
    },
};
</script>

<style lang="less" scoped>
@import "./assets/css/app.less";
@import "./assets/css/post.less";
.m-theme {
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
