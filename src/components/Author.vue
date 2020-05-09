<template>
	<div class="m-Author">
		<div class="left"><Me /></div>
		<div class="right"><Con /></div>
	</div>
</template>

<script>
import Me from '@/components/Me.vue'
import Con from '@/components/Con.vue'
export default {
	name: 'mAuthor',
	components: {
		Me,
		Con,
	},
}
</script>

<style lang="less" scoped>
.m-Author {
	min-height: 500px;
	.left {
		position: absolute;
		width: 260px;
	}
	.right {
		padding: 0 0 0 280px;
	}
}
</style>
