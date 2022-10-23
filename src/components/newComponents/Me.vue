<template>
    <div>
        <div class="m-author-header">
            <div class="m-box">
                <Avatar class="u-author-avatar" :uid="uid" :url="avatar" :size="160" :frame="avatar_frame" />
                <div class="u-author-info">
                    <span class="u-name">
                        {{ data.display_name || "匿名" }}&nbsp;<span class="u-uid">(UID : {{ data.ID || 0 }})</span>
                    </span>
                    <div class="u-tips">
                        <el-tooltip :content="`当前经验 ${data.experience || 0}`" placement="top">
                            <span class="u-level" :class="'lv-' + level" :style="{backgroundColor:showLevelColor(level)}">Lv.{{ level }}</span>
                        </el-tooltip>
                        <el-tooltip :content="vipTypeTitle" v-if="isPRO || isVIP" placement="top">
                            <a class="u-vip" href="/vip/premium?from=user_homepage" target="_blank">
                                <i class="u-icon vip">{{ vipType }}</i>
                            </a>
                        </el-tooltip>
                        <el-tooltip content="签约作者" v-if="isSuperAuthor" placement="top">
                            <span class="u-superauthor">
                                <i class="u-icon superauthor">签约作者</i>
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="u-info" :title="authorInfo.user_bio||'这个人太懒了~没有写签名。'">
                        {{ authorInfo.user_bio||'这个人太懒了~没有写签名。' }}
                    </div>
                </div>
            </div>
            <div class="m-focus">
                <div class="m-btn-box">
                    <el-button icon="el-icon-plus" class="m-btn u-btn-attention" v-if="!isFollow" @click="follow" size="mini">关注TA</el-button>
                    <div class="m-btn u-already-attention" v-else >
                        <el-button class="u-btn" size="mini" @mouseenter.native="attentionText='取消关注'" @mouseleave.native="attentionText='已关注'" @click="unfollow">{{ attentionText }}</el-button>
                        <el-button class="u-btn u-btn-disabled" size="mini"  :disabled="true">发消息</el-button>
                    </div>
                </div>

                <div class="u-more">
                    <el-popover
                        placement="bottom-start"
                        trigger="click"
                        width="90"
                        v-model="moreOperate"
                    >
                        <a href="/feedback" target="_blank">
                            <el-button size="mini" class="u-more-btn">举报</el-button>
                        </a><br>
                        <el-button size="mini" class="u-more-btn" @click="joinBlacklist">拉黑</el-button>
                        <img src="@/assets/img/more.svg" svg-inline  slot="reference" class="u-more-img"/>
                    </el-popover>
                </div>
            </div>

        </div>

        <div class="m-author-primary">
            <!--    左右分栏模式，左侧作品，右侧相关信息-->
            <div class="m-left">
                <Left class="m-common-box u-content"></Left>
            </div>
            <div class="m-right">
                <!--        加入时间-->
                <div class="m-common-box m-join-box">
                    <div class="u-join">
                        <i class="u-icon u-icon-join">
                            <img svg-inline src="../../assets/img/join.svg" />
                        </i>
                        <span>加入于 {{ data.user_registered | time }}</span>
                    </div>
                    <div class="u-fans">
                        <i class="u-icon u-icon-fans">
                            <img svg-inline src="../../assets/img/fans.svg"/>
                        </i>粉丝数 <b>{{fansNum}}</b>
                    </div>
                </div>

                <Primary @authorInfo="getAuthorInfo"></Primary>
            </div>
        </div>
    </div>
</template>

<script>
import { follow, unfollow } from "@jx3box/jx3box-common-ui/service/follow";
import { __userLevelColor } from "@jx3box/jx3box-common/data/jx3box";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
import User from "@jx3box/jx3box-common/js/user";
import { getFansCount } from "@jx3box/jx3box-common-ui/service/follow";
import {tvLink} from "@jx3box/jx3box-common/js/utils";
import dateFormat from "@/utils/dateFormat";
import {deny,undeny} from "@/service/author";
import Left from "./Left"
import  Primary from './Primary';
export default {
    name: "Me",
    components:{
        Left,
        Primary
    },
    data: function () {
        return {
            medals: [],
            medal_map,
            frames,
            isVIP: false,
            isFollow:false,
            attentionText:'已关注',
            moreOperate:false,
            fansNum:0,
            authorInfo:{}
        };
    },
    computed: {
        uid: function () {
            return this.$store.state.uid;
        },
        data: function () {
            return this.$store.state.userdata;
        },
        avatar: function () {
            return this.data.user_avatar || "";
        },
        avatar_frame: function () {
            return this.data.user_avatar_frame || "";
        },
        isPRO: function () {
            return this.data?.is_pro;
        },
        isSuperAuthor: function () {
            return !!this.data?.sign;
        },
        vipType: function () {
            return this.isPRO ? "PRO" : "PRE";
        },
        vipTypeTitle: function () {
            return this.isPRO ? "专业版会员用户" : "高级版会员用户";
        },
        level: function () {
            return User.getLevel(this.data?.experience || 0);
        },
        tv_link: function () {
            return tvLink(this.data.tv_type, this.data.tv_id) || "";
        },
        tv_img: function () {
            return __imgPath + "image/tv/" + this.data.tv_type + ".png";
        },
        frameUrl: function () {
            return __imgPath + `image/avatar/${this.avatar_frame}/${this.avatar_frame}.svg`;
        },
        isLogin: function () {
            return User.isLogin();
        },
    },
    filters:{
        time: (val) => {
            return dateFormat(new Date(val));
        },
    },
    methods: {
        // 关注
        follow() {
            if (!this.isLogin) {
                User.toLogin();
                return;
            }
            follow(this.uid)
                .then((res) => {
                    this.$message.success("关注成功");
                    this.isFollow = true;
                    this.loadFans()
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 取消关注
        unfollow() {
            this.$confirm("确定不再关注此人？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                unfollow(this.uid)
                    .then((res) => {
                        this.$message.success("取关成功");
                        this.isFollow = false;
                        this.loadFans();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }).catch(_ => {});;
        },
        showLevelColor : function (level){
            return __userLevelColor[level]
        },
        // 格式化粉丝数
        formatFansNum(num) {
            if (num < 10000) {
                return num === 0 ? "" : num;
            } else {
                return (num / 10000).toFixed(1) + "万";
            }
        },
        loadFans(){
            getFansCount(this.$store.state.uid).then(res=>{
                this.fansNum = res.data.data.follower_count || 0;
                this.isFollow = res.data.data.is_followed;
            })
        },
        getAuthorInfo(v){
            this.authorInfo=v
        },
        //拉黑
        joinBlacklist(){
            this.$confirm("确定要拉黑此人？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                deny(this.uid).then(() => {
                    this.$message.success("拉黑成功");
                }) .catch((err) => {
                    console.log(err);
                });
            }).catch(_ => {});;

        }
    },
    mounted: function () {
        if (this.uid) {
            this.loadFans();
        }
    },
}
</script>

<style scoped lang="less">
@import "../../assets/css/newCss/me.less";
@import "../../assets/css/newCss/primary.less";
</style>
