# zambia-buildings-import

Process of uploading a Zambia buildings data, generating an OSM extract file of Zambia, and comparing the two in order to upload the data to OSM.

##Data
This data was collected by <a href='http://akros.com/how-we-do-it/data-collection/'>Akros Global Health</a> in conjunction with their mSpray Malaria prevention program

##Status
Currently: Creating extract of Zambia

##Installation Requirements
(As of 8/31/2015, will be continually updating)
```
        PostGres
        PostGIS
        GDAL
        ogr2ogr
        QGIS 
        Osmium (and required dependencies/libraries)
```

##Upload process

1. <strike>Get explicit approval from Matt that we can upload the data. This needs to be relayed on the OSM wiki page here: http://wiki.openstreetmap.org/wiki/Import/Catalogue#One-Time_Imports</strike>
2. <strike>Translate the buildings data into SQL file format</strike>
3. Create country extract of Zambia to compare the Akros data against
4. Create an overlay between the OSM root data and Akros data so as to avoid uploading duplicates
5. Once the data has been modified, add the data upload plan to the OSM wiki. As per the wiki:
    "Write a 'plan' for the data upload on the OSM wiki, as per the wiki: "This plan must include information such as plans for how to convert the data to OSM XML, dividing up the work, how to handle conflation, how to map GIS attributes to OSM tags, how to potentially simplify any data, how you plan to divide up the work, revert plans, changeset size policies, and plans for quality assurance."
6. Email the the data imports listserv, and Africa listserv letting them know they can review the upload plan
7. Create a designated user account for the upload
8. Conduct the upload



