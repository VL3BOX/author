<template>
	<div id="app">
		<Header></Header>
		<Breadcrumb name="频道名称" slug="slug" root="/slug">
			<img slot="logo" svg-inline src="./assets/img/logo.svg" />
			<Info />
		</Breadcrumb>
		<LeftSidebar>
			<Me v-if="userdata !== null" :userData="userdata" />
		</LeftSidebar>
		<Main :withoutRight="false">
			<Cont :uId="uId" />
			<RightSidebar>
				<Extend />
			</RightSidebar>
			<Footer></Footer>
		</Main>
	</div>
</template>

<script>
const { JX3BOX } = require('@jx3box/jx3box-common')
const axios = require('axios')
const API = JX3BOX.__helperUrl + 'api/posts/user/'
const url = JX3BOX.__server + 'user/info' + '?uid='

import Info from '@/components/Info.vue'
import Extend from '@/components/Extend.vue'
import Cont from '@/components/Cont.vue'
import Me from '@/components/Me.vue'

export default {
	name: 'App',
	props: [],
	data: function() {
		return {
			uId: 8,
			userdata: null,
		}
	},
	computed: {},
	created: function() {
		let uid = this.uId
		// uid = this.$route.query.uid
		axios.get(url + uid).then((res) => { 
			let data = res.data.data
			this.userdata = data
		})
	},
	components: {
		Info,
		Extend,
		Me,
		Cont,
	},
}
</script>
