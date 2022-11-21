<template>
	<b-container v-if="users && users.length != 0" class="bv-example-row">
		<b-row class="mt-4 mb-4 text-center">
			<b-col>
				<user-list-item
					v-for="user in users"
					:key="user.userid"
					v-bind="user"
					@userModify="userListModify"
					@userDelete="userListDelete"
				/>
			</b-col>
		</b-row>
	</b-container>
	<b-container v-else class="bv-example mt-3">
		<b-row>
			<b-col><b-alert show>사용자 목록이 없습니다.</b-alert></b-col>
		</b-row>
	</b-container>
</template>

<script>
	import UserListItem from "@/components/user/UserListItem";
	// import { mapState } from "vuex";
	import http from "@/api/http";
	export default {
		name: "UserList",
		components: {
			UserListItem,
		},
		data() {
			return {
				users: [],
			};
		},
		created() {
			http.get("/admin/user").then(({ data }) => {
				this.users = data;
			});
		},
		methods: {
			userListModify(userid, username, userpwd, email) {
				this.users.forEach((user) => {
					if (user.userid == userid) {
						user.username = username;
						user.userpwd = userpwd;
						user.email = email;
					}
				});
			},
			userListDelete(userid) {
				this.users = this.users.filter((user) => {
					return user.userid != userid;
				});
			},
		},
	};
</script>

<style></style>
