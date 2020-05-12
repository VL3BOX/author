<template>
	<div class="m-Me">
		<div class="m-avatar">
			<img
				class="u-avatar"
				id="m-setting-avatar-img"
				:src="userData.avatar"
				:alt="userData.name"
			/>
		</div>

		<div class="m-user">
			<a class="u-name" href="https://www.jx3box.com/author/8">{{userData.name}}</a>
			<span class="u-uid">UID : {{userData.uid}}</span>
		</div>

		<div class="m-bio">{{userData.bio}}</div>

		<ul class="m-link">
			<!-- <li class="u-role"><i class="u-icon u-icon-group" title="用户组"></i><span>管理员</span></li> 
			<li class="u-email"><i class="u-icon u-icon-email" title="E-mail"></i><span>17229398@qq.com</span></li> -->
			<li class="u-join">
				<i class="u-icon u-icon-join"></i><span>加入于 {{ userData.created_at | time }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Me',
	props: ['userData'],
	filters: {
		time: (val) => {
			return val.slice(0, 10)
		},
	},
}
</script>

<style lang="less">
.m-Me {
	width: 240px;
	margin: 0 auto;
	.m-avatar {
		border: 1px solid #e1e4e8;
		width: 240px;
		height: 240px;
		margin-bottom: 20px;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.m-user {
		border-bottom: 1px solid #e1e4e8;
		padding-bottom: 10px;
		margin-bottom: 10px;
		.u-name {
			font-size: 26px;
			color: #333;
			font-weight: 700;
			display: block;
			white-space: nowrap;
			word-wrap: normal;
			word-break: keep-all;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.u-uid {
			font-size: 16px;
			line-height: 2;
			color: #666;
			display: block;
		}
	}
	.m-bio {
		font-size: 13px;
		border-bottom: 1px solid #e1e4e8;
		padding-bottom: 10px;
		margin-bottom: 10px;
	}
	.m-link {
		list-style: none;
		font-size: 14px;
		line-height: 1.8;
		color: #555;
		li {
			white-space: nowrap;
			word-wrap: normal;
			word-break: keep-all;
			text-overflow: ellipsis;
			overflow: hidden;
			i {
				width: 16px;
				height: 16px;
				margin-right: 5px;
			}
		}
	}
}
</style>
