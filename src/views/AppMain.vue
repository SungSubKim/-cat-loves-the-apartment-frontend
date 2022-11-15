<template>
	<b-container class="bv-example-row mt-3 text-center">
		<h3 class="underline-steelblue"><b-icon icon="house"></b-icon> SSAFY</h3>
		<b-row>
			<b-col></b-col>
			<b-col cols="10">
				<b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
					<template #header>SSAFY Home</template>

					<template #lead> WhereIsMyHome~!<br /> </template>

					<hr class="my-4" />

					<p>Vue + Bootstrap활용.</p>
					<p>Bootstrap-vue는 버전 <b>4.6.1</b>을 권장합니다.</p>
					<p><b>BoardList.vue</b>를 바꿔가면서 테스트하세요.</p>
					<p>Bootstrap의 <b>table</b> 사용법을 익히게됩니다.</p>
				</b-jumbotron>
			</b-col>
			<b-col></b-col>
		</b-row>

		<div class="container">
			<div class="row justify-content-center">
				<!-- <%--지도를 담기 위한 영역--%> -->
				<div id="map" style="width: 70%; top: 50px; height: 400px"></div>
				<center></center>
				<!-- <%--라이브러리 불러오는 방법 LIBRARY 토큰 부분에 사용하고자하는 라이브러리 이름을 적으면 해당 라이브러리를
				불러올 수 있다
				<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=APIKEY&libraries=LIBRARY"></script>
				--%> <%--실제 지도를 그리는 Javascript API를 불러오기--%>
				<script
					type="text/javascript"
					src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d141aeed5339bd04ba26793348816663&libraries=services"
				></script> -->
			</div>
		</div>
	</b-container>
</template>

<script>
	export default {
		name: "AppMain",
		props: {
			msg: String,
		},
		methods: {
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
				console.log(map);
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

<style scoped>
	.underline-steelblue {
		display: inline-block;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
	}
</style>
