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

    // An entity object which will hold info about the currently selected feature for infobox display
    var selectedEntity = new Cesium.Entity();

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

            // Set feature infobox description
            var gml_id = picked3DtileFeature.getProperty('gml_id');
            selectedEntity.name = "GML_ID: " + gml_id + "";
            selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
            viewer.selectedEntity = selectedEntity;
            selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
                '<tr><th>ID</th><td>' + picked3DtileFeature.getProperty('ID') + '</td></tr>' +
                '<tr><th>HighestRoof</th><td>' + picked3DtileFeature.getProperty('HighestRoof') + '</td></tr>' +
                '<tr><th>Kerroksia</th><td>' + picked3DtileFeature.getProperty('Kerroksia') + '</td></tr>' +
                '<tr><th>Kerrosala</th><td>' + picked3DtileFeature.getProperty('Kerrosala') + '</td></tr>' +
                '<tr><th>Valmistunut</th><td>' + picked3DtileFeature.getProperty('Valmistunut') + '</td></tr>' +
                '<tr><th>Bel_SPL</th><td>' + picked3DtileFeature.getProperty('Bel_SPL') + '</td></tr>' +
                '<tr><th>V</th><td>' + picked3DtileFeature.getProperty('V') + '</td></tr>' +
                '<tr><th>A</th><td>' + picked3DtileFeature.getProperty('A') + '</td></tr>' +
                '<tr><th>W</th><td>' + picked3DtileFeature.getProperty('W') + '</td></tr>' +
                '<tr><th>J</th><td>' + picked3DtileFeature.getProperty('J') + '</td></tr>' +
                '</tbody></table>';
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
active3DTilePicker()