Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMDEyYTJkMy00OTNhLTQ4ZGItYTM3Mi02OTRhMWQ1NzM5MTciLCJpZCI6MzU4MjMsImlhdCI6MTYwMjU5MzUwMX0.mB-BBNsNw8gKxoBmCwb8wl17ZY2WiAJoUL0FQdD12HM';

var viewer = new Cesium.Viewer('cesiumContainer');
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: "../Building/tileset.json"
}))

Cesium.when(tileset.readyPromise).then(function (tileset) {viewer.flyTo(tileset)})
