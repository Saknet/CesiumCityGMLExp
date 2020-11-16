var viewer = new Cesium.Viewer('cesiumContainer');
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: "../Building/tileset.json"
}))

Cesium.when(tileset.readyPromise).then(function (tileset) {viewer.flyTo(tileset)})

function colorByResult () {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${B[SPL]} === null', 'color("red")'],
                ['Number(${B[SPL]}) === undefined', 'color("red")'],
                ['Number(${B[SPL]}) >= 1000', 'color("red")'],
                ['Number(${B[SPL]}) >= 500', 'color("orange")'],
                ['Number(${B[SPL]}) >= 100', 'color("yellow")'],
                ['Number(${B[SPL]}) >= 50', 'color("purple")'],
                ['Number(${B[SPL]}) >= 25', 'color("blue")'],
                ['Number(${B[SPL]}) >= 0', 'color("green")'],
                // ['true', 'color("cyan")']
            ]
        }
    });
}


colorByResult();

console.log(tileset);
