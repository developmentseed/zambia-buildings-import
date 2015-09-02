// This is the test script that is being worked on to create the Zambia extract. It is currently being tested and will be updated once testing is complete. 

// initialize turf boundingbox
var osmium = require('osmium');
var buffered_writer = require('buffered-writer');
var turf = require('turf')
var fs= require('fs')
var gjstream = require('geojson-stream')

//boundingbox=

var bbox = [38.4041,-78.7939,39.7663,-76.2396];

var reader = new osmium.Reader("dc-baltimore_maryland.osm", {node:true, way:true, relation:true});
var handler = new osmium.Handler();
var boundingbox = turf.bboxPolygon(bbox);


var fileout = fs.createWriteStream("dcbalt-extract.geojson")
var featureout = gjstream.stringify()
featureout.pipe(fileout)

handler.on('way', function(way) {
    console.log("way with id ", way.id);
    console.log("way changeset",way.changeset);
    console.log("way version",way.version);

    // if boundinbox.intersects(way.geojson)
    // var intersection = turf.intersect(boundingBox, way.geojson());
	// console.log (intersection);
  	try {
  		var waygeometry = way.geojson();  		
    	var wayfeature = {
    		type: 'Feature',
    		geometry: waygeometry,
    		properties: {}
    	};
    	var baltimorewayenvelope = turf.envelope(wayfeature);
    	var intersection = turf.intersect(boundingbox,baltimorewayenvelope)
    	if (intersection) {
    		featureout.write(wayfeature)
    	}
  	} catch(e) {
  		console.log(way);
  		console.log(way.node_refs());
  		console.log(e);
  		process.exit();
  	}



});

handler.on('done',function(){
	featureout.end()
}) 

handler.on('relation', function(relation) {
    console.log("relation with id ", relation.id);
    console.log("relation changeset",relation.changeset);
    console.log("relation version",relation.version);
});

var locationhandler = new osmium.LocationHandler();
osmium.apply(reader, locationhandler, handler)
