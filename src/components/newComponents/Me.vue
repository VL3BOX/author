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
                </div>
            </div>
            <div class="m-focus">
                <el-button icon="el-icon-plus" class="u-btn u-btn-attention" v-if="!isFollow" @click="follow">关注</el-button>
                <el-button class="u-btn u-already-attention" @mouseenter.native="attentionText='取消关注'" @mouseleave.native="attentionText='已关注'" v-else @click="unfollow">{{ attentionText }}</el-button>
                <div class="u-more">
                    <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 20C2.33696 20 1.70107 19.7366 1.23223 19.2678C0.763393 18.7989 0.5 18.163 0.5 17.5C0.5 16.837 0.763393 16.2011 1.23223 15.7322C1.70107 15.2634 2.33696 15 3 15C3.66304 15 4.29893 15.2634 4.76777 15.7322C5.23661 16.2011 5.5 16.837 5.5 17.5C5.5 18.163 5.23661 18.7989 4.76777 19.2678C4.29893 19.7366 3.66304 20 3 20ZM3 12.5C2.33696 12.5 1.70107 12.2366 1.23223 11.7678C0.763393 11.2989 0.5 10.663 0.5 10C0.5 9.33696 0.763393 8.70107 1.23223 8.23223C1.70107 7.76339 2.33696 7.5 3 7.5C3.66304 7.5 4.29893 7.76339 4.76777 8.23223C5.23661 8.70107 5.5 9.33696 5.5 10C5.5 10.663 5.23661 11.2989 4.76777 11.7678C4.29893 12.2366 3.66304 12.5 3 12.5ZM3 5C2.33696 5 1.70107 4.73661 1.23223 4.26777C0.763393 3.79893 0.5 3.16304 0.5 2.5C0.5 1.83696 0.763393 1.20107 1.23223 0.732233C1.70107 0.263392 2.33696 0 3 0C3.66304 0 4.29893 0.263392 4.76777 0.732233C5.23661 1.20107 5.5 1.83696 5.5 2.5C5.5 3.16304 5.23661 3.79893 4.76777 4.26777C4.29893 4.73661 3.66304 5 3 5Z" fill="white" fill-opacity="1"/>
                    </svg>

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
                            <img svg-inline src="../../assets/img/fans.svg" />
                        </i>粉丝数 {{fansNum}}
                    </div>
                </div>
<!--                &lt;!&ndash;        粉丝团&ndash;&gt;-->
<!--                <AuhorFans :uid="Number(uid)" class="m-common-box m-fans"></AuhorFans>-->
<!--                &lt;!&ndash;        他的荣誉&ndash;&gt;-->
<!--                <AuthorMedals :uid="uid" class="m-common-box m-medals"></AuthorMedals>-->
<!--                &lt;!&ndash;        他的团队&ndash;&gt;-->
<!--                <AuthorTeams :uid="uid" class="m-common-box m-teams"></AuthorTeams>-->
                <Primary></Primary>
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
            fansNum:0,
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
            });
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
