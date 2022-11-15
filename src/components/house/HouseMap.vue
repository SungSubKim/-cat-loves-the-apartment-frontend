<template>
	<div>
		<h3>아파트 위치</h3>
		<div id="map" style="width: 100%; height: 400px"></div>
	</div>
</template>

<script>
import { mapActions,mapState } from "vuex";
	export default {
		name: "HouseMap",
		data() {
			return {
				houses: [],
			};
	},
	computed: {
		...mapState(["map"]),
	},
	methods: {
			...mapActions(["setMap"]),
			/* eslint-disable */
			initMap() {
				var mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
				var mapOptions = {
					//지도를 생성할 때 필요한 기본 옵션
					//LatLng = 위경도 좌표(위도(latitude), 경도(longitude))
					center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.(지도를 생성하는데 반드시 필요)
					level: 6, //지도의 레벨(확대, 축소 정도)
				};

				var map = new kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴
				// console.log("map");
				// console.log(map);
				// console.log("setMapfunc")
				// this.setMap(map);
			},
		},
		mounted() {
			//script 태그 객체 생성
			/* eslint-disable */
			if (!window.kakao || !window.kakao.maps) {
				let serviceKey = "d141aeed5339bd04ba26793348816663";
				let script0 = document.createElement("script");
				script0.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${serviceKey}&libraries=LIBRARY
      &autoload=false`;
				script0.type = "text/javascript";
				let script = document.createElement("script");
				script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${serviceKey}&libraries=services&autoload=false`;
				script.type = "text/javascript";
				script.addEventListener("load", () => {
					kakao.maps.load(this.initMap);
				});
				document.head.appendChild(script0);
				document.head.appendChild(script);
			}
		},
	};
</script>

<style></style>
