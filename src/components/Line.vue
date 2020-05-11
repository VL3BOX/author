<template>
	<div class="m-Line" v-if="list !== null">
		<div class="t-year">
			<span>更新至：{{ list[0].post_modified }}</span>
		</div>

		<div class="item" v-for="(item, i) in list" :key="i">
			<span class="icon"></span>
			<a :href="item.post_guid" class="title">{{ item.post_title }}</a>
			<div class="detail">
				<a :href="'https://www.jx3box.com/' + item.post_type" class="type">{{ item.post_type_name }}</a>
				<span class="date"
					><i class="u-icon u-icon-updatetime"></i> <time>{{ item.post_modified }}</time></span
				>
			</div>
		</div>

		<el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage">
		</el-pagination>
	</div>
</template>

<script>
const { JX3BOX } = require('@jx3box/jx3box-common')
const axios = require('axios')
const API = JX3BOX.__helperUrl + 'api/posts/user/'

export default {
	name: 'mLine',
	props: ['uId'],
	data: function() {
		return {
			list: null,
			total: null,
		}
	},
	created: function() {
		axios.get(API + this.uId + '?page=' + '1').then((res) => {
			let data = res.data.data.posts
			data.forEach(function(item, i) {
				item.post_type_name = JX3BOX.__postType[item.post_type]
			})
			this.list = data
			this.total = res.data.data.total
		})
	},
	methods: {
		changePage(page) {
			axios.get(API + this.uId + '?page=' + page).then((res) => {
				let data = res.data.data.posts
				data.forEach(function(item, i) {
					item.post_type_name = JX3BOX.__postType[item.post_type]
				})
				this.list = data
			})
		},
	},
}
</script>

<style lang="less">
.t-year {
	span {
		font-size: 16px;
		padding: 0 10px;
		color: #586069;
		background-color: #fff;
	}
	&:after {
		position: absolute;
		top: 12px;
		right: 0;
		left: 0;
		z-index: -1;
		height: 1px;
		content: '';
		background-color: #eaecef;
	}
}
</style>
<style lang="less" scoped>
.item + .item {
	border-top: 1px solid #e1e4e8;
}
.item {
	list-style: none;
	border-left: 2px solid #e1e4e8;
	position: relative;
	margin-left: 24px;
	padding: 24px 0 24px 20px;
	a {
		color: #0366d6;
		&:hover {
			text-decoration: underline;
		}
	}

	.icon {
		float: left;
		width: 32px;
		height: 32px;
		margin-top: -5px;
		margin-left: -39px;
		line-height: 28px;
		color: #24292e;
		text-align: center;
		background-color: #e1e4e8;
		border: 2px solid #fff;
		border-radius: 50%;
	}
	.title {
		display: inline-block;
		margin-bottom: 5px;
	}
	.detail {
		font-size: 13px;
		color: #586069;
		.type {
			margin-right: 10px;
			color: #586069;
		}
	}
}
.showmore {
	width: 100%;
}
</style>
