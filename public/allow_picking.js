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
    // Color a feature yellow on hover.
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
                picked3DtileFeature.color = Cesium.Color.YELLOW;
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

    selectedEntity.name = "GML_ID: " + gml_id + "";
    selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
    viewer.selectedEntity = selectedEntity;
    selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' 
        + '<tr><th>ID</th><td>' + picked3DtileFeature.getProperty('ID') + '</td></tr>';

    if (highestRoof !== undefined && highestRoof !== null ) {
        selectedEntity.description += '<tr><th>HighestRoof</th><td>' + highestRoof + '</td></tr>';
    }                 

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
    
//    if (name !== undefined && name !== null ) {
        selectedEntity.description += '<tr><th>Name</th><td>' + name + '</td></tr>';
//    }
    
//    if (description !== undefined && description !== null ) {
        selectedEntity.description += '<tr><th>Description</th><td>' + description + '</td></tr>';
//    }

    if (height !== undefined && height !== null ) {
        selectedEntity.description += '<tr><th>Height</th><td>' + height + '</td></tr>';
    }

 //   if (lumen !== undefined && name !== null ) {
        selectedEntity.description += '<tr><th>Lumen</th><td>' + lumen + '</td></tr>';
 //       selectedEntity.description += '<tr><th>Result</th><td>' + result + '</td></tr>';

 //   }
}

active3DTilePicker();