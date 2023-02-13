// emily_board-format.jsx takes 16 layers and reformats them in a neat 4x4 grid.

// flip selected layers order
var layers = getSelectedLayers().reverse();

boardFormat(layers);

function boardFormat(layers){
    // throw error if there arent exactly 16 layers
    if (layers.length != 16) {
        alert("Please select 16 frames!")
        return
    }
    for( var i = 0 ; i < layers.length; i++ ){
        var saveUnits = app.preferences.rulerUnits;
        app.preferences.rulerUnits = Units.PERCENT;

        layers[i].resize(23, 23, AnchorPosition.MIDDLECENTER)

        app.preferences.rulerUnits = saveUnits;
    }
    // 4x4 grid, assumes that image + canvas size is 1920x1080
    var j = 0;
    for (var a = 0; a < 4; a++) {
        for (var b = 0; b < 4; b++) {
            layers[j].translate( UnitValue(-705+(470*b), "px"), UnitValue(-396+(264*a), "px"));
            j++;
        }
    }
}

// retrieves list of selected layers in descending position order
function getSelectedLayers(){ 
	var idGrp = stringIDToTypeID( "groupLayersEvent" );
	var descGrp = new ActionDescriptor();
	var refGrp = new ActionReference();
	refGrp.putEnumerated(charIDToTypeID( "Lyr " ),charIDToTypeID( "Ordn" ),charIDToTypeID( "Trgt" ));
	descGrp.putReference(charIDToTypeID( "null" ), refGrp );
	executeAction( idGrp, descGrp, DialogModes.ALL );
	var resultLayers=new Array();
	for (var ix=0;ix<app.activeDocument.activeLayer.layers.length;ix++){resultLayers.push(app.activeDocument.activeLayer.layers[ix])}
	var id8 = charIDToTypeID( "slct" );
    var desc5 = new ActionDescriptor();
    var id9 = charIDToTypeID( "null" );
    var ref2 = new ActionReference();
    var id10 = charIDToTypeID( "HstS" );
    var id11 = charIDToTypeID( "Ordn" );
    var id12 = charIDToTypeID( "Prvs" );  
    ref2.putEnumerated( id10, id11, id12 );
	desc5.putReference( id9, ref2 );
	executeAction( id8, desc5, DialogModes.NO );
	return resultLayers;
}