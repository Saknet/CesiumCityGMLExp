var viewer = new Cesium.Viewer('cesiumContainer');
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: "../Building/tileset.json"
}))

Cesium.when(tileset.readyPromise).then(function (tileset) {viewer.flyTo(tileset)})

bel();

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
                ['Number(${Bel_SPL}) >= 60', 'color("red")'],
                ['Number(${Bel_SPL}) >= 50', 'color("orange")'],
                ['Number(${Bel_SPL}) >= 45', 'color("yellow")'],
                ['Number(${Bel_SPL}) >= 40', 'color("blue")'],
                ['Number(${Bel_SPL}) >= 35', 'color("green")'],
                ['Number(${Bel_SPL}) >= 30', 'color("teal")'],
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
                ['Number(${J}) >= 10000000', 'color("red")'],
                ['Number(${J}) >= 1000000', 'color("orange")'],
                ['Number(${J}) >= 100000', 'color("yellow")'],
                ['Number(${J}) >= 10000', 'color("blue")'],
                ['Number(${J}) >= 1000', 'color("green")'],
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
                ['Number(${V}) >= 375', 'color("red")'],
                ['Number(${V}) >= 325', 'color("orange")'],
                ['Number(${V}) >= 300', 'color("yellow")'],
                ['Number(${V}) >= 275', 'color("blue")'],
                ['Number(${V}) >= 250', 'color("green")'],
                ['Number(${V}) >= 225', 'color("teal")'],
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
                ['Number(${A}) >= 1.0', 'color("red")'],
                ['Number(${A}) >= 0.9', 'color("orange")'],
                ['Number(${A}) >= 0.8', 'color("yellow")'],
                ['Number(${A}) >= 0.7', 'color("blue")'],
                ['Number(${A}) >= 0.6', 'color("green")'],
                ['Number(${A}) >= 0.5', 'color("teal")'],
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
                ['Number(${W}) >= 250', 'color("red")'],
                ['Number(${W}) >= 225', 'color("orange")'],
                ['Number(${W}) >= 200', 'color("yellow")'],
                ['Number(${W}) >= 100', 'color("blue")'],
                ['Number(${W}) >= 5', 'color("green")'],
                ['Number(${W}) >= 0', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}
