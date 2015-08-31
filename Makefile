download shp file: house_2014.shp

ogr2ogr: ogr2ogr -f "PostgreSQL" PG:"host=myhost user=myloginname dbname=mydbname" houses_2014.shp (may need to add -nln "newtablename"
