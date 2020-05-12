<template>
	<div id="app">
		<Header></Header>
		<Breadcrumb :name="name" slug="author" :root="root">
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
const { JX3BOX,Utils } = require('@jx3box/jx3box-common')
const axios = require('axios')
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
			uId: 0,
			userdata: null,
			name : '作者',
			root : ''
		}
	},
	computed: {
	},
	created: function() {

		this.uid = Utils.getQuery('uid')
		axios.get(url + this.uid).then((res) => { 
			let data = res.data.data
			this.userdata = data
			this.name = data.name
			this.root = '/author?uid=' + data.uid
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
