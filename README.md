##Git repo for Orbital 2020
######By Tan Pinxi & Amelia Yamato

####Database

Contains files to setup MySQL database, which is currently hosted on localhost. RequestHandler provides API for the extension and dashboard to access the database via XMLHttpRequests. 

####Extension

The browser extension is hosted on TamperMonkey and uses both standard HTML/javascript functions as well as functions provided by GreaseMonkey under the GM library.

####Dashboard

We are using an open-source modular framework, Cube.js, to build the main analytics dashboard / control panel for the users. Cube.js is run back-end as a service, managing the connection to a mySQL database and pre-aggregation, query-queueing and more. Cube.js also exposes an API for our front-end application, allowing us to build customised dashboards and other analytics features. Using ReactJS, we are able to customise the user interface of the analytics dashboard. 

