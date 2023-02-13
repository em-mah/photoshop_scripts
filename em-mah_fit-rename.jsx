// emily_fit-rename.jsx uses the first layer in selection to rename and increment the rest of the layers.

// flip selected layers order
var layers = getSelectedLayers().reverse();

fitRenameLayers(layers);

function fitRenameLayers(layers){
    var layerstart = layers[0].name
    var startnum = layerstart.match(/[0-9]+/g).pop(); //regex to get starting number
    
    for (var i = 0; i < layers.length; i ++) {
        layers[i].name = layerstart //makes sure everything is named the same
        
        var newNum = Number(startnum)+i //increments the number (removes 0s)
        
		while (newNum.length < startnum.length) newNum = "0" + newNum;
        
        layers[i].name = layerstart.replace(startnum, newNum)
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