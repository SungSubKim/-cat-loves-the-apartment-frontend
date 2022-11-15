<template>
	<b-row class="mt-4 mb-4 text-center">
		<!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
		<b-col class="sm-3">
			<b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
		</b-col>
		<b-col class="sm-3">
			<b-form-select v-model="gugunCode" :options="guguns" @change="searchApt"></b-form-select>
		</b-col>
	</b-row>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";

	export default {
		name: "HouseSearchBar",
		data() {
			return {
				sidoCode: null,
				gugunCode: null,
			};
		},
		computed: {
			...mapState(["sidos", "guguns", "houses"]),
			// sidos() {
			//   return this.$store.state.sidos;
			// },
		},
		created() {
			// this.$store.dispatch("getSido");
			// this.sidoList();
			this.CLEAR_SIDO_LIST();
			this.CLEAR_APT_LIST();
			this.getSido();
		},
		methods: {
			...mapActions(["getSido", "getGugun", "getHouseList"]),
			...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_APT_LIST"]),
			// sidoList() {
			//   this.getSido();
			// },
			gugunList() {
				// console.log(this.sidoCode);
				this.CLEAR_GUGUN_LIST();
				this.gugunCode = null;
				if (this.sidoCode) this.getGugun(this.sidoCode);
			},
			async searchApt0() {
				if (this.gugunCode) await this.getHouseList(this.gugunCode);
				// console.log(houses);
				// this.$store.state.houses.forEach(function (house) {
				// 	console.log(house);
				// });
			},
			searchApt() {
				this.searchApt0().then(() => {
					console.log("hi");
					console.log(this.houses);
					this.$store.state.houses.forEach(function (house) {
						console.log(house);
					});
				});
			},

			/* eslint-disable */
			drawPosition(latitude, longitude, name) {
				// 마커 이미지의 이미지 주소입니다
				var imageSrc = "${root}/assets/img/a.png";

				// 마커 이미지의 이미지 크기 입니다
				var imageSize = new kakao.maps.Size(24, 35);

				// 마커 이미지를 생성합니다
				var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
					map: map, // 마커를 표시할 지도
					position: new kakao.maps.LatLng(latitude, longitude), // 마커를 표시할 위치
					title: name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
					image: markerImage, // 마커 이미지
				});
				map.setCenter(new kakao.maps.LatLng(latitude, longitude));

				// 마커가 지도 위에 표시되도록 설정합니다
				marker.setMap(map);

				var iwContent = '<div style="padding:2px;width: auto;">' + name + "</div>", // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
					iwPosition = new kakao.maps.LatLng(latitude, longitude); //인포윈도우 표시 위치입니다

				// 인포윈도우를 생성합니다
				var infowindow = new kakao.maps.InfoWindow({
					position: iwPosition,
					content: iwContent,
				});

				// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
				infowindow.open(map, marker);
			},
		},
	};
</script>

<style></style>
