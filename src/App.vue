<template>
	<div id="app">
		<Header></Header>
		<Breadcrumb name="频道名称" slug="slug" root="/slug">
			<img slot="logo" svg-inline src="./assets/img/logo.svg" />
			<Info />
		</Breadcrumb>
		<LeftSidebar> </LeftSidebar>
		<Main :withoutRight="false">
			<mAuthor />
			<RightSidebar>
				<Extend />
			</RightSidebar>
			<Footer></Footer>
		</Main>
	</div>
</template>

<script>
import Info from '@/components/Info.vue'
import Extend from '@/components/Extend.vue'
import mAuthor from '@/components/Author.vue'

export default {
	name: 'App',
	props: [],
	data: function() {
		return {}
	},
	computed: {},
	methods: {},
	mounted: function() {},
	components: {
		Info,
		Extend,
		mAuthor,
	},
}
</script>
