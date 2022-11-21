<template>
	<b-tr>
		<b-tr v-if="!isModify">
			<b-td> {{ username }}</b-td>
			<b-th class="text-left">
				{{ userid }}
			</b-th>
			<b-td>{{ userpwd }}</b-td>
			<b-td>{{ email }}</b-td>
			<b-button variant="outline-primary" @click="viewModify">수정</b-button>
			<b-button variant="outline-danger" @click="userDelete">삭제</b-button>
		</b-tr>
		<b-tr v-else>
			<input type="text" v-model="username2" />
			<input type="text" v-model="userid2" />
			<input type="text" v-model="userpwd2" />
			<input type="text" v-model="email2" />
			<b-button variant="primary" @click="userModify">수정</b-button>
			<b-button variant="danger" @click="closeModify">취소</b-button>
		</b-tr>
	</b-tr>
</template>

<script>
	import http from "@/api/http";
	export default {
		props: {
			username: String,
			userid: String,
			userpwd: String,
			email: String,
		},
		data() {
			return {
				isModify: false,
				userid2: "",
				username2: "",
				userpwd2: "",
				email2: "",
			};
		},
		methods: {
			viewModify() {
				console.log("viewModify");
				this.userid2 = this.userid;
				this.username2 = this.username;
				this.userpwd2 = this.userpwd;
				this.email2 = this.email;
				this.isModify = true;
			},
			closeModify() {
				console.log("closeModify");
				this.isModify = false;
			},
			userModify() {
				console.log("userModify");
				console.log(this.userid2);
				console.log(this.username2);
				console.log(this.userpwd2);
				// this.$emit('user-modify', this.userid, this.username, this.userpwd, this.email);
				http
					.put("/admin/user", {
						userid: this.userid2,
						username: this.username2,
						userpwd: this.userpwd2,
						email: this.email2,
					})
					.then(() => {
						this.$emit("userModify", this.userid2, this.username2, this.userpwd2, this.email2);
						this.isModify = false;
					});
			},
			userDelete() {
				console.log("userDelete");
				if (this.userid == "admin") {
					alert("관리자는 삭제할 수 없습니다.");
					return;
				}
				http
					.delete("/admin/user/" + this.userid, {
						userid: this.userid,
					})
					.then(() => {
						this.$emit("userDelete", this.userid);
					});
			},
		},
	};
</script>

<style></style>
