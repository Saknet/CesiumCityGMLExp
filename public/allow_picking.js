var Pickers_3DTile_Activated = true;
function active3DTilePicker() {
    var highlighted = {
        feature: undefined,
        originalColor: new Cesium.Color()
    };
    // Information about the currently selected feature
    var selected = {
        feature: undefined,
        originalColor: new Cesium.Color()
    };

    // Get default left click handler for when a feature is not picked on left click
    var clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // Color a feature green on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
        if (Pickers_3DTile_Activated) {
            // If a feature was previously highlighted, undo the highlight
            if (Cesium.defined(highlighted.feature)) {
                highlighted.feature.color = highlighted.originalColor;
                highlighted.feature = undefined;
            }
            // Pick a new feature
            var picked3DtileFeature = viewer.scene.pick(movement.endPosition);
            if (!Cesium.defined(picked3DtileFeature)) {
                // nameOverlay.style.display = 'none';
                return;
            }
            // A feature was picked, so show it's overlay content
            // nameOverlay.style.display = 'block';
            // nameOverlay.style.bottom = viewer.canvas.clientHeight - movement.endPosition.y + 'px';
            // nameOverlay.style.left = movement.endPosition.x + 'px';
            var name = picked3DtileFeature.getProperty('CODE');
            if (!Cesium.defined(name)) {
                name = picked3DtileFeature.getProperty('ID');
            }
            // nameOverlay.textContent = name;
            // Highlight the feature if it's not already selected.
            if (picked3DtileFeature !== selected.feature) {
                highlighted.feature = picked3DtileFeature;
                Cesium.Color.clone(picked3DtileFeature.color, highlighted.originalColor);
                picked3DtileFeature.color = Cesium.Color.GREEN;
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Color a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
        if (Pickers_3DTile_Activated) {
            // If a feature was previously selected, undo the highlight
            if (Cesium.defined(selected.feature)) {
                selected.feature.color = selected.originalColor;
                selected.feature = undefined;
            }
            // Pick a new feature
            var picked3DtileFeature = viewer.scene.pick(movement.position);
            if (!Cesium.defined(picked3DtileFeature)) {
                clickHandler(movement);
                return;
            }
            // Select the feature if it's not already selected
            if (selected.feature === picked3DtileFeature) {
                return;
            }
            selected.feature = picked3DtileFeature;
            // Save the selected feature's original color
            if (picked3DtileFeature === highlighted.feature) {
                Cesium.Color.clone(highlighted.originalColor, selected.originalColor);
                highlighted.feature = undefined;
            } else {
                Cesium.Color.clone(picked3DtileFeature.color, selected.originalColor);
            }

            generateFeatureInfoTable(picked3DtileFeature);

        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

function getTimeseries(sensors) {
    let firstTime = Number.MAX_VALUE;
    let lastTime = 0;

    for (let i = 0; i < sensors.sensors.length; i++) {
        let data = JSON.parse(sensors.sensors[i].sensordata);
        for (let j = 0; j < data.timeseries.length; j++) {
            if (data.timeseries[j].time < firstTime) {
                firstTime = data.timeseries[j].time;
            } 
            if (data.timeseries[j].time > lastTime) {
                lastTime = data.timeseries[j].time;
            } 
        }
    }

    let middleTime = lastTime - ((lastTime - firstTime) / 2);

    let timeseries = new Object();
    timeseries.firstTime = firstTime;
    timeseries.lastTime = lastTime;
    timeseries.middleTime = middleTime;
    timeseries.secondTime = middleTime - ((lastTime - firstTime) / 4);
    timeseries.fourthTime = lastTime - ((lastTime - firstTime) / 4);

    return timeseries;

}

function getSensorsTotalResult(sensors, time, unitofmeasurement) {
    let total = 0;
    let sensorCount = 0;
    for (let i = 0; i < sensors.sensors.length; i++) {
        if (sensors.sensors[i].uom === unitofmeasurement) {
            let data = JSON.parse(sensors.sensors[i].sensordata);
            let closestDistance = Number.MAX_VALUE;
            let closestTime = -1;
            let closestIndex = -1;
            for (let j = 0; j < data.timeseries.length; j++) {
                if (time >= data.timeseries[j].time) {
                    if ((time - data.timeseries[j].time) < closestDistance ) {
                        closestIndex = j;
                        closestTime = data.timeseries[j].time;
                        closestDistance =  time - closestTime;
                        console.log("end");
                        console.log(j);
                        console.log(closestTime);
                    }
                } else {
                    if ((data.timeseries[j].time - time) < closestDistance ) {
                        closestIndex = j;
                        closestTime = data.timeseries[j].time;
                        closestDistance =  closestTime - time;
                        console.log("start");
                        console.log(j);
                        console.log(closestTime);
                    }
                }

            }
            console.log(closestDistance);
            console.log(time);
            console.log(data);
            console.log(i);
            console.log(closestIndex);
            sensorCount++;
            if (closestIndex != -1) {
                total  += Number(data.timeseries[closestIndex].value);
            }
        }

    }
    console.log("total sensors");
    console.log(sensorCount);
    
    return total;

}

function generateFeatureInfoTable(picked3DtileFeature) {
    console.log(picked3DtileFeature);
    var selectedEntity = new Cesium.Entity();
    let gml_id = picked3DtileFeature.getProperty('gml_id');
    let highestRoof =  picked3DtileFeature.getProperty('HighestRoof');
    let kerroksia =  picked3DtileFeature.getProperty('Kerroksia');
    let kerrosala =  picked3DtileFeature.getProperty('Kerrosala');
    let valmistunut =  picked3DtileFeature.getProperty('Valmistunut');
    let bel_spl =  picked3DtileFeature.getProperty('bel_spl');
    let volt =  picked3DtileFeature.getProperty('v');
    let ampere =  picked3DtileFeature.getProperty('a');
    let watt =  picked3DtileFeature.getProperty('w');
    let joule =  picked3DtileFeature.getProperty('j');
    let name = picked3DtileFeature.getProperty('light_name');
    let description = picked3DtileFeature.getProperty('light_description');
    let height = picked3DtileFeature.getProperty('height');
    let lumen = picked3DtileFeature.getProperty('lumen');
    let result = picked3DtileFeature.getProperty('result');
    let sensor = picked3DtileFeature.getProperty('sensorasset_sensor_xlink_href');
    let thing = picked3DtileFeature.getProperty('thing_link');
    let sensors = picked3DtileFeature.getProperty('sensorasset');

    selectedEntity.name = "GML_ID: " + gml_id + "";
    selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
    viewer.selectedEntity = selectedEntity;
    selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' 
        + '<tr><th>ID</th><td>' + picked3DtileFeature.getProperty('ID') + '</td></tr>';

    selectedEntity.description += '<tr><th>HighestRoof</th><td>' + highestRoof + '</td></tr>';
                

    if (kerroksia !== undefined && kerroksia !== null ) {
        selectedEntity.description += '<tr><th>Kerroksia</th><td>' + kerroksia + '</td></tr>';
    } 

    if (kerrosala !== undefined && kerrosala !== null ) {
        selectedEntity.description += '<tr><th>Kerrosala</th><td>' + kerrosala + '</td></tr>';
    }  
            
    if (valmistunut !== undefined && valmistunut !== null ) {
        selectedEntity.description += '<tr><th>Valmistunut</th><td>' + valmistunut + '</td></tr>';
    }

    if (bel_spl !== undefined && bel_spl !== null ) {
        selectedEntity.description += '<tr><th>Bel_SPL</th><td>' + bel_spl + '</td></tr>';
    }
            
    if (volt !== undefined && volt !== null ) {
         selectedEntity.description += '<tr><th>V</th><td>' + volt + '</td></tr>';
    }
            
    if (ampere !== undefined && ampere !== null ) {
        selectedEntity.description += '<tr><th>A</th><td>' + ampere + '</td></tr>';
    }  
            
    if (watt !== undefined && watt !== null ) {
        selectedEntity.description += '<tr><th>W</th><td>' + watt + '</td></tr>';
    }
            
    if (joule !== undefined && joule !== null ) {
        selectedEntity.description += '<tr><th>J</th><td>' + joule + '</td></tr>';
    } 
    
    if (sensors !== undefined && sensors !== null ) {
        let timeseries = getTimeseries(sensors);
        let realTimes = parsetime(timeseries.lastTime);

        let totalFirstJoules = getSensorsTotalResult(sensors, timeseries.firstTime, 'j');
        let totalFirstVolts = getSensorsTotalResult(sensors, timeseries.firstTime, 'v');
        let totalFirstAmpers = getSensorsTotalResult(sensors, timeseries.firstTime, 'a');
        let totalFirstWatts = getSensorsTotalResult(sensors, timeseries.firstTime, 'w');

        selectedEntity.description += '<tr><th> Total J measured at ' + realTimes.first + '</th><td>' + totalFirstJoules.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total V measured at ' + realTimes.first + '</th><td>' + totalFirstVolts.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total A measured at ' + realTimes.first + '</th><td>' + totalFirstAmpers.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total W measured at ' + realTimes.first + '</th><td>' + totalFirstWatts.toFixed(2) + '</td></tr>';

        let totalSecondJoules = getSensorsTotalResult(sensors, timeseries.secondTime, 'j');
        let totalSecondVolts = getSensorsTotalResult(sensors, timeseries.secondTime, 'v');
        let totalSecondAmpers  = getSensorsTotalResult(sensors, timeseries.secondTime, 'a');
        let totalSecondWatts = getSensorsTotalResult(sensors, timeseries.secondTime, 'w');

        selectedEntity.description += '<tr><th> Total J measured at ' + realTimes.second + '</th><td>' + totalSecondJoules.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total V measured at ' + realTimes.second + '</th><td>' + totalSecondVolts.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total A measured at ' + realTimes.second + '</th><td>' + totalSecondAmpers.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total W measured at ' + realTimes.second + '</th><td>' + totalSecondWatts.toFixed(2)+ '</td></tr>';

        let totalThirdJoules = getSensorsTotalResult(sensors, timeseries.middleTime, 'j');
        let totalThirdVolts = getSensorsTotalResult(sensors, timeseries.middleTime, 'v');
        let totalThirdAmpers  = getSensorsTotalResult(sensors, timeseries.middleTime, 'a');
        let totalThirdWatts = getSensorsTotalResult(sensors, timeseries.middleTime, 'w');

        selectedEntity.description += '<tr><th> Total J measured at ' + realTimes.third + '</th><td>' + totalThirdJoules.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total V measured at ' + realTimes.third + '</th><td>' + totalThirdVolts.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total A measured at ' + realTimes.third + '</th><td>' + totalThirdAmpers.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total W measured at ' + realTimes.third + '</th><td>' + totalThirdWatts.toFixed(2) + '</td></tr>';

        let totalFourthJoules = getSensorsTotalResult(sensors, timeseries.fourthTime, 'j');
        let totalFourthVolts = getSensorsTotalResult(sensors, timeseries.fourthTime, 'v');
        let totalFourthAmpers  = getSensorsTotalResult(sensors, timeseries.fourthTime, 'a');
        let totalFourthWatts = getSensorsTotalResult(sensors, timeseries.fourthTime, 'w');



        selectedEntity.description += '<tr><th> Total J measured at ' + realTimes.fourth + '</th><td>' + totalFourthJoules.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total V measured at ' + realTimes.fourth + '</th><td>' + totalFourthVolts.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total A measured at ' + realTimes.fourth + '</th><td>' + totalFourthAmpers.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total W measured at ' + realTimes.fourth + '</th><td>' + totalFourthWatts.toFixed(2) + '</td></tr>';

        let totalFifthJoules = getSensorsTotalResult(sensors, timeseries.lastTime, 'j');
        let totalFifthVolts = getSensorsTotalResult(sensors, timeseries.lastTime, 'v');
        let totalFifthAmpers  = getSensorsTotalResult(sensors, timeseries.lastTime, 'a');
        let totalFifthWatts = getSensorsTotalResult(sensors, timeseries.lastTime, 'w');

        selectedEntity.description += '<tr><th> Total J measured at ' + realTimes.fifth + '</th><td>' + totalFifthJoules.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total V measured at ' + realTimes.fifth + '</th><td>' + totalFifthVolts.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total A measured at ' + realTimes.fifth + '</th><td>' + totalFifthAmpers.toFixed(2) + '</td></tr>';
        selectedEntity.description += '<tr><th> Total W measured at ' + realTimes.fifth + '</th><td>' + totalFifthWatts.toFixed(2) + '</td></tr>';
    } 
}

function parsetime(lastTime) {
    let year = lastTime.substring(0, 4);
    let month = lastTime.substring(4, 6);
    let day = lastTime.substring(6, 8);
    let hours = lastTime.substring(8, 10);
    let minutes = lastTime.substring(10, 12);
    let seconds = lastTime.substring(12, 14);
    let ms = lastTime.substring(15, 17);

    let realTimes = new Object();

    let latest = new Date(Date.UTC(year, month, day, hours, minutes, seconds, ms));
    let fifthTime = latest.getTime();
    let fourthTime = fifthTime - 30 * 60 * 1000;
    let thirdTime = fourthTime - 30 * 60 * 1000;
    let secondTime = thirdTime - 30 * 60 * 1000;
    let firstTime = secondTime - 30 * 60 * 1000;

    realTimes.fifth = new Date(fifthTime).toLocaleString();
    realTimes.fourth = new Date(fourthTime).toLocaleString();
    realTimes.third = new Date(thirdTime).toLocaleString();
    realTimes.second = new Date(secondTime).toLocaleString();
    realTimes.first = new Date(firstTime).toLocaleString();

    return realTimes;
  }



active3DTilePicker();