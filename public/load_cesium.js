var viewer = new Cesium.Viewer('cesiumContainer');
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: "../Building/tileset.json"
}))

Cesium.when(tileset.readyPromise).then(function (tileset) {viewer.flyTo(tileset)})

function handleSelectChange(event) {
    let unitofmeasurement = event.target.value;
    if (unitofmeasurement === 'Bel_SPL') {
        bel();
    }
    if (unitofmeasurement === 'J') {
        joule();
    }
    if (unitofmeasurement === 'V') {
        volt();
    }
    if (unitofmeasurement === 'A') {
        ampere();
    }
    if (unitofmeasurement === 'W') {
        watt();
    }
}

function bel() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${Bel_SPL} === null', 'color("aqua")'],
                ['Number(${Bel_SPL}) === undefined', 'color("aqua")'],
                ['Number(${Bel_SPL}) >= 1000', 'color("red")'],
                ['Number(${Bel_SPL}) >= 500', 'color("orange")'],
                ['Number(${Bel_SPL}) >= 100', 'color("yellow")'],
                ['Number(${Bel_SPL}) >= 50', 'color("blue")'],
                ['Number(${Bel_SPL}) >= 25', 'color("green")'],
                ['Number(${Bel_SPL}) >= 0', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function joule() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${J} === null', 'color("aqua")'],
                ['Number(${J}) === undefined', 'color("aqua")'],
                ['Number(${J}) >= 10000', 'color("red")'],
                ['Number(${J}) >= 5000', 'color("orange")'],
                ['Number(${J}) >= 1000', 'color("yellow")'],
                ['Number(${J}) >= 500', 'color("blue")'],
                ['Number(${J}) >= 205', 'color("green")'],
                ['Number(${J}) >= 0', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function volt() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${V} === null', 'color("aqua")'],
                ['Number(${V}) === undefined', 'color("aqua")'],
                ['Number(${V}) >= 1000', 'color("red")'],
                ['Number(${V}) >= 500', 'color("orange")'],
                ['Number(${V}) >= 100', 'color("yellow")'],
                ['Number(${V}) >= 50', 'color("blue")'],
                ['Number(${V}) >= 25', 'color("green")'],
                ['Number(${V}) >= 0', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function ampere() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${A} === null', 'color("aqua")'],
                ['Number(${A}) === undefined', 'color("aqua")'],
                ['Number(${A}) >= 1000', 'color("red")'],
                ['Number(${A}) >= 500', 'color("orange")'],
                ['Number(${A}) >= 100', 'color("yellow")'],
                ['Number(${A}) >= 50', 'color("blue")'],
                ['Number(${A}) >= 25', 'color("green")'],
                ['Number(${A}) >= 0', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function watt() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${W} === null', 'color("aqua")'],
                ['Number(${W}) === undefined', 'color("aqua")'],
                ['Number(${W}) >= 1000', 'color("red")'],
                ['Number(${W}) >= 500', 'color("orange")'],
                ['Number(${W}) >= 100', 'color("yellow")'],
                ['Number(${W}) >= 50', 'color("blue")'],
                ['Number(${W}) >= 25', 'color("green")'],
                ['Number(${W}) >= 0', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}
