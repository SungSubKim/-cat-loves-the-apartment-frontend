<template>
	<b-container class="mt-3">
		<b-row text-center>
			<b-col>
				<b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
			</b-col>
		</b-row>
		<b-row>
			<b-container class="text-left">
				<div class="row justify-content-center">
					<div class="col-lg-10 col-md-10 col-sm-12">
						<b-form @submit="onSubmit" @reset="onReset">
							<b-form-group label="이름: " label-for="userName" description="이름을 입력하세요">
								<b-form-input
									class="form-control"
									id="username"
									type="text"
									v-model="userInfo.userName"
									placeholder="이름..."
								/>
							</b-form-group>
							<b-form-group label="아이디: " label-for="userId" description="아이디를 입력하세요">
								<b-form-input
									class="form-control"
									id="userid"
									type="text"
									v-model="userInfo.userId"
									placeholder="아이디..."
								/>
							</b-form-group>
							<div id="idcheck-result"></div>
							<b-form-group label="비밀번호: " label-for="userPassword" description="비밀번호를 입력하세요">
								<b-form-input
									class="form-control"
									id="userpassword"
									type="password"
									v-model="userInfo.userPassword"
									placeholder="비밀번호..."
								/>
							</b-form-group>
							<b-form-group
								label="비밀번호 확인: "
								label-for="userPasswordConfirm"
								description="비밀번호를 다시 입력하세요"
							>
								<b-form-input
									class="form-control"
									id="userpasswordconfirm"
									type="password"
									v-model="userInfo.userPasswordConfirm"
									placeholder="비밀번호 확인..."
								/>
							</b-form-group>
							<b-form-group label="이메일: " label-for="userEmail" description="이메일을 입력하세요">
								<b-form-input
									class="form-control"
									id="useremail"
									type="email"
									v-model="userInfo.userEmail"
									placeholder="이메일..."
								/>
							</b-form-group>

							<div class="col-auto text-center">
								<b-button type="submit" variant="primary" class="m-1">회원가입</b-button>
								<b-button type="reset" variant="danger" class="m-1">초기화</b-button>
							</div>
						</b-form>
					</div>
				</div>
			</b-container>
		</b-row>
	</b-container>
</template>

<script>
	import http from "@/api/http";
	export default {
		name: "UserRegister",
		data() {
			return {
				userInfo: {
					userName: "",
					userId: "",
					userPwd: "",
					emailId: "",
					emailDomain: "",
				},
			};
		},
		mounted() {
			let isUseId = false;
			document.querySelector("#userid").addEventListener("keyup", function () {
				let userid = this.value;
				let resultDiv = document.querySelector("#idcheck-result");
				if (userid.length < 6 || userid.length > 16) {
					resultDiv.setAttribute("class", "mb-3 text-dark");
					resultDiv.textContent = "아이디는 6자 이상 16자 이하 입니다.";
					isUseId = false;
				} else {
					http.get("/user/idcheck/" + userid).then((res) => {
						if (res.data) {
							resultDiv.setAttribute("class", "mb-3 text-danger");
							resultDiv.textContent = "이미 사용중인 아이디 입니다.";
							isUseId = false;
						} else {
							resultDiv.setAttribute("class", "mb-3 text-success");
							resultDiv.textContent = "사용 가능한 아이디 입니다.";
							isUseId = true;
						}
					});
					// fetch("${root}/user/" + userid)
					// 	.then((response) => response.text())
					// 	.then((data) => {
					// 		if (data == 0) {
					// 			console.log(data);
					// 			resultDiv.setAttribute("class", "mb-3 text-primary");
					// 			resultDiv.textContent = userid + "는 사용할 수 있습니다.";
					// 			isUseId = true;
					// 		} else {
					// 			resultDiv.setAttribute("class", "mb-3 text-danger");
					// 			resultDiv.textContent = userid + "는 사용할 수 없습니다.";
					// 			isUseId = false;
					// 		}
					// 	});
				}
			});

			document.querySelector("#btn-join").addEventListener("click", function () {
				if (!document.querySelector("#username").value) {
					alert("이름 입력!!");
					return;
				} else if (!document.querySelector("#userid").value) {
					alert("아이디 입력!!");
					return;
				} else if (!document.querySelector("#userpwd").value) {
					alert("비밀번호 입력!!");
					return;
				} else if (document.querySelector("#userpwd").value != document.querySelector("#pwdcheck").value) {
					alert("비밀번호 확인!!");
					return;
				} else if (!isUseId) {
					alert("아이디 확인!!");
					return;
				} else {
					let form = document.querySelector("#form-join");
					form.setAttribute("action", "${root}/user/join");
					form.submit();
				}
			});
		},
		methods: {
			onSubmit(event) {
				event.preventDefault();

				let err = true;
				let msg = "";
				!this.article.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
				err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
				err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

				if (!err) alert(msg);
				else this.type === "register" ? this.registArticle() : this.modifyArticle();
			},
			onReset(event) {
				event.preventDefault();
				this.article.articleno = 0;
				this.article.subject = "";
				this.article.content = "";
				this.moveList();
			},
			registArticle() {
				http
					.post(`/board`, {
						userid: this.article.userid,
						subject: this.article.subject,
						content: this.article.content,
					})
					.then(({ data }) => {
						let msg = "등록 처리시 문제가 발생했습니다.";
						if (data === "success") {
							msg = "등록이 완료되었습니다.";
						}
						alert(msg);
						this.moveList();
					});
			},
		},
	};
</script>

<style></style>
