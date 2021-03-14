<template>
  <div class="m-post" v-loading="loading">
    <el-timeline class="m-post-list" v-if="list && list.length">
      <el-timeline-item v-for="(item, i) in list" :key="i" :timestamp="item.checked_at | dateFormat" placement="top">
        <h4 class="u-type">铭牌关键词</h4>
        <p>
          <a :href="item.link || defult_link" class="u-title" target="_blank">{{ item.key || '未知' }}</a>
        </p>
      </el-timeline-item>
    </el-timeline>
    <el-alert v-else title="没有找到相关条目" type="info" show-icon> </el-alert>

    <el-pagination class="m-author-pages" background :hide-on-single-page="true" layout="prev, pager, next" :total="total" :current-page.sync="page" :page-size="per"> </el-pagination>
  </div>
</template>

<script>
import dateFormat from '../utils/dateFormat'
import { getNamespace } from '@/service/helper.js'
export default {
  props: ['uid'],
  data: function() {
    return {
      loading: false,
      list: [],
      total: 1,
      per: 10,
      page: 1,
      defult_link: 'https://www.jx3box.com',
    }
  },
  computed: {
    params: function() {
      return {
        user_id: this.uid,
        page: this.page,
        limit: this.per,
      }
    },
  },
  methods: {
    loadData: function() {
      this.loading = true
      getNamespace(this.params)
        .then((res) => {
          this.list = res.data.data.data
          this.total = res.data.data.total
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  filters: {
    dateFormat: function(val) {
      return dateFormat(new Date(~~val * 1000))
    },
  },
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler: function() {
        this.loadData()
      },
    },
  },
  mounted: function() {},
}
</script>
