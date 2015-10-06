## Extracting Zambia

![zambia](https://cloud.githubusercontent.com/assets/719357/10229553/d06fc1b8-6846-11e5-834c-7e0f1ea5181a.gif)

Zambia doesn't exist on [GeoFabrik Extracts](http://download.geofabrik.de/) or [Mapzen Metro Extracts](https://mapzen.com/data/metro-extracts), so we need to extract it from Africa.

First download Africa's PBF (~1GB):

```sh
wget http://download.geofabrik.de/africa-latest.osm.pbf
```

Download and compile [osm-convert](https://wiki.openstreetmap.org/wiki/Osmconvert)

```sh
wget -O - http://m.m.i24.cc/osmconvert.c | cc -x c - -lz -O3 -o osmconvert
```

Use a bounding box to extract Zambia (26M): `[min_lon, min_lat, max_lon, max_lat]`. Use `--complete-ways` to get ways that cross the bounding box. This is important for `node-osmium` to run properly.

```sh
osmconvert africa-latest.osm.pbf -b=24.7,-15.0,34.9,-8.1 --complete-ways -o=zambianorth.pbf -v
```

## Converting to GeoJSON

There are many tools to convert OSM data to GeoJSON, but `libosmium` is the basis of most of them. It's a C++ library written to read OSM files with [bindings](http://osmcode.org/) in Python and NodeJS.

Here's a script that extracts the roads and buildings from an OSM file and writes them to GeoJSON. I even included nifty progress bars to indicate how long you have to wait (thanks for the idea @anandthakker). For the portion of Zambia we are working with, it takes about 10 minutes to turn the file to GeoJSON.

```
npm install osmium geojson-stream progress through
```

```js
var osmium = require('osmium');
var fs = require('fs');
var gjstream = require('geojson-stream');
var ProgressBar = require('progress');
var through = require('through');

var reader = new osmium.Reader('zambianorth.pbf');
var handler = new osmium.Handler();


// FIRST PASS - COUNT THE WAYS

var ways = 0;

handler.on('way', function (way) {
  if (way.tags('building') || way.tags('highway')) ways++;
});

osmium.apply(reader, handler);

// SECOND PASS - PROCESS WAYS

var fileout = fs.createWriteStream('zambia-extract.geojson');
var featureout = gjstream.stringify();

var bar = new ProgressBar(' processing [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  total: ways
});

var file_bar = new ProgressBar(' writing [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  total: ways
});

// Updates the writing to file bar
featureout.pipe(through(function (data) {
  file_bar.tick();
  this.queue(data);
})).pipe(fileout);


handler.on('way', function (way) {
  try {
    if (way.tags('building') || way.tags('highway')) {
      var wayfeature = {
        type: 'Feature',
        geometry: way.geojson(),
        properties: {}
      };
      featureout.write(wayfeature);
      bar.tick();
    }
  } catch(e) {
    console.log(way);
    console.log(e);
  }
});

var reader = new osmium.Reader('zambianorth.pbf');
var locationhandler = new osmium.LocationHandler();
osmium.apply(reader, locationhandler, handler);
featureout.end();
console.log('Done processing...writing to file.');
```

:warning: If you get a "module did not self register" error, try `node v0.10.x`

