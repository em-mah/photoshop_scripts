// emily_batch-rename.jsx takes user-input to batch rename all selected layers

var inputName = prompt("To rename multiple layers, use whitespace and  '#'  to pad", "frame ###");
var layers = getSelectedLayers().reverse(); // flip selected layers order

batchRenameLayers(inputName, layers);

function batchRenameLayers(inputName, layers){
	var matches = inputName.match(/#+/g); //regex find all instances of #
	if (matches == null) {
		for (var i = 0; i < layers.length; i ++){
			layers[i].name = inputName;
		}
		return;
	}
	const replaceMe = matches[0]; //retrieves the first instance of #+
	for (var i = 0; i < layers.length; i ++){
		var num = i.toString();
		var size = replaceMe.length;
		while (num.length < size) num = "0" + num;
		layers[i].name = inputName.replace(replaceMe, num);	
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