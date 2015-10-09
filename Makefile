# download shp file

house_2014.shp

# Run ogr2ogr on buildings dataset: 

ogr2ogr -f "PostgreSQL" PG:"host=myhost user=myloginname dbname=mydbname" houses_2014.shp 
# may need to add -nln "newtablename"

# Download most recent file of Africa data for extract creation from geofabrick

# Follow process for creating Zambia extract 

https://github.com/developmentseed/zambia-buildings-import/blob/master/Zambia%20Extract/extract-creation-process.md

#Write extract file to postgresql from .geojson using ogr2ogr

ogr2ogr -f "PostgreSQL" PG:"host=myhost user=myloginname dbname=mydbname" extract-zambia.geojson

#Conduct ST_Overlaps using postgis to determine whether or not there are duplicates between the 2 datasets

Select ogrgeojson.ogc_fid, ogrgeojson.wkb_geometry
 From ogrgeojson, zambiaextract
 Where ST_Overlaps(ogrgeojson.wkb_geometry, zambiaextract.wkb_geometry)

 # (In the case above no results were returned)

 # Open buildings dataset in JOSM, run validation to clean the records





