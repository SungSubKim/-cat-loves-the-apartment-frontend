<template>
	<!-- <b-container class="bv-example-row"> -->
	<b-tr v-if="!isModify" class="myrow">
		<b-th class="bg-light text-center">
			{{ username }}
		</b-th>
		<b-th class="bg-light text-center">
			{{ userid }}
		</b-th>
		<b-th class="bg-light text-center">
			{{ userpwd }}
		</b-th>
		<b-th class="bg-light text-center">
			{{ email }}
		</b-th>
		<b-th class="bg-light pl-0 pr-0 pt-auto text-center">
			<b-button class="bg-light" variant="outline-primary" @click="viewModify">수정</b-button>
		</b-th>
		<b-th class="bg-light pl-0 pr-0 pt-auto text-center">
			<b-button class="bg-light" variant="outline-danger" @click="userDelete">삭제</b-button>
		</b-th>
	</b-tr>
	<b-row v-else class="myrow">
		<b-th class="bg-light text-center">
			<input type="text" v-model="username2" />
		</b-th>
		<b-th class="bg-light text-center">
			<input type="text" v-model="userid2" />
		</b-th>
		<b-th class="bg-light text-center">
			<input type="text" v-model="userpwd2" />
		</b-th>
		<b-th class="bg-light text-center">
			<input type="text" v-model="email2" />
		</b-th>
		<b-button class="bg-light p-1" variant="primary" @click="userModify">수정</b-button>
		<b-button class="bg-light p-1" variant="danger" @click="closeModify">취소</b-button>
	</b-row>
	<!-- </b-container> -->
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

<style scoped>
	.p-2 {
		border-radius: 6px;
	}
	.text-center {
		font-weight: normal;
	}
</style>
