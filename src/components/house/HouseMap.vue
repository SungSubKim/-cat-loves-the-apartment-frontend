<template>
	<div>
		<h3>아파트 위치</h3>
		<div id="map" style="width: 100%; height: 400px"></div>
	</div>
</template>

<script>
	export default {
		name: "HouseMap",
		data() {
			return {};
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
