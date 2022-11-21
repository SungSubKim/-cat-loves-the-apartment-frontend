<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand href="#">
				<router-link :to="{ name: 'main' }">
					<b-img
						:src="require('@/assets/ssafy_logo.png')"
						id="logo"
						class="d-inline-block align-top"
						alt="logo"
					></b-img>
				</router-link>
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="#">
						<router-link :to="{ name: 'main' }" class="link">
							<b-icon icon="house-door" animation="spin" font-scale="2"></b-icon>
							메인
						</router-link>
						<router-link :to="{ name: 'insta' }" class="m-2 link">
							<b-icon icon="instagram" animation="spin" font-scale="2"></b-icon>
							인스타그램
						</router-link>
						<router-link :to="{ name: 'board' }" class="m-2 link">
							<b-icon icon="journal" animation="spin-reverse" font-scale="2"></b-icon>
							게시판
						</router-link>
						<router-link :to="{ name: 'house' }" class="m-2 link">
							<b-icon icon="house-fill" animation="fade" font-scale="2"></b-icon>
							아파트정보
						</router-link>
						<router-link :to="{ name: 'todo' }" class="link">
							<b-icon icon="calendar-check" animation="fade" font-scale="2"></b-icon>
							TodoList
						</router-link>
					</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item v-if="userInfo.userid" style="margin-top: 10px; margin-right: 10px">
						{{ userInfo.userid }}님, 반갑습니다!
					</b-nav-item>
					<b-nav-item-dropdown right>
						<template #button-content>
							<b-icon icon="people" font-scale="2"></b-icon>
						</template>
						<b-dropdown-item href="#">
							<router-link :to="{ name: 'join' }" class="link">
								<b-icon icon="person-circle"></b-icon> 회원가입
							</router-link>
						</b-dropdown-item>
						<b-dropdown-item href="#" v-if="!userInfo.userid">
							<router-link :to="{ name: 'login' }" class="link"> <b-icon icon="key"></b-icon> 로그인 </router-link>
						</b-dropdown-item>

						<b-dropdown-item href="#" class="link" @click="logout" v-else>
							<b-icon icon="key"></b-icon> 로그아웃
						</b-dropdown-item>
						<b-dropdown-item href="#" class="link" @click="userManager" v-if="userInfo.userid == 'admin'">
							<b-icon icon="key"></b-icon> 유저 관리
						</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "TheHeaderNavbar",
		computed: {
			...mapState("userStore", ["userInfo"]),
		},
		data() {
			return {};
		},
		methods: {
			logout() {
				// console.log("logout");
				this.$store.dispatch("userStore/logout");
				if (this.$route.path !== "/") this.$router.push({ name: "main" });
			},
			userManager() {
				this.$router.push({ name: "userList" });
			},
		},
	};
</script>

<style scoped>
	#logo {
		width: 120px;
	}

	.link {
		text-decoration: none;
	}
</style>
