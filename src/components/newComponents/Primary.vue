<template>
<div class="c-author">

<!--        粉丝团-->
        <AuthorFans :uid="Number(uid)" class="m-common-box m-fans"></AuthorFans>
    <div class="m-common-box m-user-bio">
        <div class="u-label"><i class="el-icon-edit"></i><span>TA的签名</span></div>
        <div class="u-userBio">
            {{data.user_bio||'这个人太懒了~没有写签名。'}}
        </div>
    </div>
        <div class="m-common-box m-links" v-if="data!=''&& (data.weibo_id || data.github_id||data.tv_id)">
<!--            ||data.tuilan_id-->
            <div class="u-label"><i class="el-icon-user"></i><span>TA的信息</span></div>
            <AuthorLink class="u-links" :uid="uid" :data="data" />
        </div>
<!--        他的荣誉-->
        <AuthorMedals :uid="uid" class="u-trophy m-common-box m-medals"></AuthorMedals>
<!--        他的团队-->
        <AuthorTeams :uid="uid" class="u-teams m-common-box m-teams"></AuthorTeams>
</div>
</template>

<script>

import AuthorFans from "@jx3box/jx3box-common-ui/src/author/AuthorFans";
import AuthorLink from "@jx3box/jx3box-common-ui/src/author/AuthorLink";
import AuthorMedals from "@jx3box/jx3box-common-ui/src/author/AuthorMedals";
import AuthorTeams from "@jx3box/jx3box-common-ui/src/author/AuthorTeams";
import { getUserInfo } from "@jx3box/jx3box-common-ui/service/author";
export default {
    name: "Primary",
    components:{
        AuthorFans,
        AuthorLink,
        AuthorMedals,
        AuthorTeams,
    },
    data: function () {
        return {
            data: "",
        };
    },
    computed: {
        uid: function () {
            return this.$store.state.uid;
        }
    },
    mounted() {
        this.installModules()
    },
    methods:{
        installModules: function () {
            getUserInfo(this.uid).then((data) => {
                if (data) {
                    this.data = data;
                    console.log(data)
                    this.$emit('autherInfo',data)
                }
            });
        },
    }
}
</script>

<style scoped lang="less">
@import "../../assets/css/newCss/primary.less";
//.c-author {
//
//    .u-tips {
//        .db;
//        color: #555;
//        font-size: 12px;
//    }
//
//    .u-label {
//        margin: 15px 0 10px 0;
//        padding: 0 5px 10px 0;
//        i {
//            .mr(5px);
//        }
//        span {
//            .fz(13px);
//        }
//        border-bottom: 1px solid @border;
//    }
//
//    @keyframes living-icon-ani {
//        0% {
//            -webkit-transform: scaleY(0.5);
//            transform: scaleY(0.5);
//        }
//        50% {
//            -webkit-transform: scaleY(1);
//            transform: scaleY(1);
//        }
//        to {
//            -webkit-transform: scaleY(0.5);
//            transform: scaleY(0.5);
//        }
//    }
//
//    .u-tv-living {
//        .dbi;
//        .ml(10px);
//    }
//
//    .u-tv-living-icon {
//        .h(10px);
//    }
//
//    .u-tv-living-icon-col {
//        .dbi;
//        transform-origin: bottom;
//        width: 2px;
//        height: 100%;
//        margin: 0 1px;
//        background-color: #fb7299;
//        border-radius: 2px;
//        animation: living-icon-ani 0.6s linear infinite;
//    }
//    .u-tv-living-icon-col.first {
//        animation-delay: -0.2s;
//    }
//    .u-tv-living-icon-col.last {
//        animation-delay: 0.2s;
//    }
//
//    .u-interact{
//        .mt(5px);
//        display: flex;
//    }
//    .u-links{
//        .mt(15px);
//    }
//
//}

//.c-sidebar-left .c-author {
//    margin: 10px;
//}
//
//.c-sidebar-right .c-author {
//    margin: 15px;
//}

</style>
