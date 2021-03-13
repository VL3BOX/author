<template>
  <div class="m-author-body">
    <el-tabs class="m-tabs" v-model="active" @tab-click="changeTab">
      <el-tab-pane label="最新作品" name="post">
        <Post :uid="uid" />
      </el-tab-pane>
      <el-tab-pane label="百科贡献" name="wiki">
        <Wiki :uid="uid" />
      </el-tab-pane>
      <el-tab-pane label="TA的题目" name="question">
        <Question :uid="uid" />
      </el-tab-pane>
      <el-tab-pane label="TA的试卷" name="paper">
        <Paper :uid="uid" />
      </el-tab-pane>
      <el-tab-pane label="TA的清单" name="plan">
        <Plan :uid="uid" />
      </el-tab-pane>
      <el-tab-pane label="TA的小册" name="collection">
        <Collection :uid="uid" />
      </el-tab-pane>
      <el-tab-pane label="TA的铭牌" name="namespace">
        <Namespace :uid="uid" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import Wiki from '@/components/Wiki.vue'
import Question from '@/components/Question.vue'
import Paper from '@/components/Paper.vue'
import Collection from '@/components/Collection.vue'
import Namespace from '@/components/Namespace.vue'
import Plan from '@/components/item_plan.vue'
export default {
  name: 'Primary',
  props: ['uid'],
  data: function() {
    return {
      active: 'post',
    }
  },
  methods: {
    changeTab(tab, event) {
      // console.log(tab, event)
    },
  },
  components: {
    Post,
    Wiki,
    Question,
    Paper,
    Collection,
    Namespace,
    Plan,
  },
}
</script>

<style lang="less">
.m-tabs {
  padding: 20px;
  .is-active {
    .bold;
  }
  .el-tabs__nav-wrap {
    padding: 0 20px;
  }
}
</style>
