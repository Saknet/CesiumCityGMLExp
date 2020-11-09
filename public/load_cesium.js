var viewer = new Cesium.Viewer('cesiumContainer');
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: "../Building/tileset.json"
}))

Cesium.when(tileset.readyPromise).then(function (tileset) {viewer.flyTo(tileset)})

function colorByResult () {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${result} === null', 'color("red")'],
                ['Number(${result}) === undefined', 'color("red")'],
                ['Number(${result}) >= 1000', 'color("red")'],
                ['Number(${result}) >= 500', 'color("orange")'],
                ['Number(${result}) >= 100', 'color("yellow")'],
                ['Number(${result}) >= 50', 'color("purple")'],
                ['Number(${result}) >= 25', 'color("blue")'],
                ['Number(${result}) >= 0', 'color("green")'],
                // ['true', 'color("cyan")']
            ]
        }
    });
}


colorByResult();

console.log(tileset);
