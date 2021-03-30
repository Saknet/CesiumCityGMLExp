Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMDEyYTJkMy00OTNhLTQ4ZGItYTM3Mi02OTRhMWQ1NzM5MTciLCJpZCI6MzU4MjMsImlhdCI6MTYwMjU5MzUwMX0.mB-BBNsNw8gKxoBmCwb8wl17ZY2WiAJoUL0FQdD12HM';

var viewer = new Cesium.Viewer('cesiumContainer');
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: "../Building/tileset.json"
}))

Cesium.when(tileset.readyPromise).then(function (tileset) {viewer.flyTo(tileset)})

lumen();

function handleSelectChange(event) {
    let unitofmeasurement = event.target.value;
    if (unitofmeasurement === 'bel_spl') {
        bel();
    }
    if (unitofmeasurement === 'j') {
        joule();
    }
    if (unitofmeasurement === 'v') {
        volt();
    }
    if (unitofmeasurement === 'a') {
        ampere();
    }
    if (unitofmeasurement === 'w') {
        watt();
    }
}

function bel() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${bel_spl} === null', 'color("blue")'],
                ['Number(${bel_spl}) === undefined', 'color("blue")'],
                ['Number(${bel_spl}) >= 60', 'color("red")'],
                ['Number(${bel_spl}) >= 50', 'color("orange")'],
                ['Number(${bel_spl}) >= 45', 'color("yellow")'],
                ['Number(${bel_spl}) >= 40', 'color("blue")'],
                ['Number(${bel_spl}) >= 35', 'color("green")'],
                ['Number(${bel_spl}) >= 30', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function joule() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${j} === null', 'color("blue")'],
                ['Number(${j}) === undefined', 'color("blue")'],
                ['Number(${j}) >= 10000000', 'color("red")'],
                ['Number(${j}) >= 1000000', 'color("orange")'],
                ['Number(${j}) >= 100000', 'color("yellow")'],
                ['Number(${j}) >= 10000', 'color("blue")'],
                ['Number(${j}) >= 1000', 'color("green")'],
                ['Number(${j}) >= 0', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function volt() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${v} === null', 'color("blue")'],
                ['Number(${v}) === undefined', 'color("blue")'],
                ['Number(${v}) >= 375', 'color("red")'],
                ['Number(${v}) >= 325', 'color("orange")'],
                ['Number(${v}) >= 300', 'color("yellow")'],
                ['Number(${v}) >= 275', 'color("blue")'],
                ['Number(${v}) >= 250', 'color("green")'],
                ['Number(${v}) >= 225', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function ampere() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${a} === null', 'color("blue")'],
                ['Number(${a}) === undefined', 'color("blue")'],
                ['Number(${a}) >= 1.0', 'color("red")'],
                ['Number(${a}) >= 0.9', 'color("orange")'],
                ['Number(${a}) >= 0.8', 'color("yellow")'],
                ['Number(${a}) >= 0.7', 'color("blue")'],
                ['Number(${a}) >= 0.6', 'color("green")'],
                ['Number(${a}) >= 0.5', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function watt() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${w} === null', 'color("blue")'],
                ['Number(${w}) === undefined', 'color("blue")'],
                ['Number(${w}) >= 250', 'color("red")'],
                ['Number(${w}) >= 225', 'color("orange")'],
                ['Number(${w}) >= 200', 'color("yellow")'],
                ['Number(${w}) >= 100', 'color("blue")'],
                ['Number(${w}) >= 5', 'color("green")'],
                ['Number(${w}) >= 0', 'color("teal")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}

function lumen() {
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ['${lumen} === null', 'color("white")'],
                ['${light_name} === "pole"', 'color("silver")'],
                ['Number(${lumen}) === undefined', 'color("white")'],
                ['Number(${lumen}) >= 8000', 'color("teal")'],
                ['Number(${lumen}) >= 5000', 'color("yellow")'],
                ['Number(${lumen}) >= 1', 'color("red")'],
                ['true', 'color("cyan")']
            ]
        }
    });
}
