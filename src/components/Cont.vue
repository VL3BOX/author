<template>
	<div class="m-Con">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="概览" name="tab_1">
				<mLine :uId="uId" />
			</el-tab-pane>
			<el-tab-pane label="最新作品" name="tab_2"></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import mLine from '@/components/Line.vue'
export default {
	name: 'Con',
	props: ['uId'],
	data: function() {
		return {
			activeName: 'tab_1',
		}
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event) 
		},
	},
	components: {
		mLine,
	},
}
</script>

<style lang="less">
.m-Con {
	padding: 24px;
}
</style>
