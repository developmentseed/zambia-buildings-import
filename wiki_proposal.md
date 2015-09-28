<h2> Current Status:</h2>

Creating the extract for the portion of Zambia where the data is located. Once the extract is created, we will be able to compare the current OSM data to the data to be uploaded. 

<h1>Proposal: </h1>



Akros Global Health is an organization that works to strengthen national health systems in developing countries. One of the programs Akros has initiated is mSpray, Indoor Residual Spraying for Malaria prevention. Through this program, Akros collected data on the location of buildings that have been sprayed. 

Akros contacted Development Seed to conduct the import of this building dataset (268k records). This data is verified by Akros Global Health contributors. This proposal suggests a one time import, with possible future imports once additional datasets have been cleaned and verified. 

Import process: 
Create country extract of Zambia to compare the Akros data against
Create an overlay between the OSM root data and Akros data so as to avoid uploading duplicates
Once the data has been modified, add the data upload plan to the OSM wiki. As per the wiki: "Write a 'plan' for the data upload on the OSM wiki, as per the wiki: "This plan must include information such as plans for how to convert the data to OSM XML, dividing up the work, how to handle conflation, how to map GIS attributes to OSM tags, how to potentially simplify any data, how you plan to divide up the work, revert plans, changeset size policies, and plans for quality assurance."
Email the the data imports listserv, and Africa listserv letting them know they can review the upload plan
Create a designated user account for the upload
Conduct the upload

<h2>Dedicated user accounts </h2>

As per OSM import guidelines, this import will be conducted with dedicated user accounts, that pattern for creating user accounts will be as follows:

<username>_zambiabuildings

So for the username laurencjay, the account name would be 

laurencjay_zambiabuildings

<h2>Conversion Code and Converted Data</h2>

We have created two scripts for this project: 1) to create the Zambia OSM extract and 2) to create the overlay between the Zambia OSM extract, and the Akros dataset. Both of these scripts and our import process documentation can be found on github.

<h2>Attribute mapping tags</h2>

Tags follow OSM guidelines, currently the only tag being used by this dataset is “building=yes.”

<h2>Timeline</h2>

Proposal review August 18th - October 1st 2015

Incorporate feedback and test imports by October 15th 2015

Development Seed imports October 19th - October 23rd 2015

Finalize import by end of October 2015

**Timeline above is rough**
