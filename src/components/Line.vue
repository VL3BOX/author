<template>
	<div class="m-Line">
		<div class="t-year"><span>2020</span></div>

		<div class="item">
			<span class="icon"></span>
			<a href="#" class="title">资源查询接口</a>
			<div class="detail">
				<a href="#" class="type">帮助文档</a>
				<span class="date"><i class="u-icon u-icon-updatetime"></i> <time>2020-02-21</time></span>
			</div>
		</div>

		<div class="item">
			<span class="icon"></span>
			<a href="#" class="title">资源查询接口</a>
			<div class="detail">
				<a href="#" class="type">帮助文档</a>
				<span class="date"><i class="u-icon u-icon-updatetime"></i> <time>2020-02-21</time></span>
			</div>
		</div>

		<el-button class="showmore">显示更多</el-button>
	</div>
</template>

<script>
export default {
	name: 'mLine',
	props: [],
	data: function() {
		return {}
	},
	methods: {},
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
