<template>
    <div class="m-author">
        <Me />
        <Primary/>
        <Footer></Footer>
    </div>
</template>

<script>


import Me from "@/components/Me.vue";
import Primary from "@/components/Primary.vue";
export default {
    name: "Index",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {
        Me,
        Primary,
    },
};
</script>

<style lang="less">
    @import '../assets/css/post.less';
</style>
