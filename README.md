<<<<<<< HEAD
Git repo for Orbital 2020
Level: Gemini
By Tan Pinxi & Amelia Yamato

Problem: 
Currently, many teenagers and young adults are highly distracted by social media and entertainment websites when working on their computers. With study and work commitments, it is important for one to manage their time well, and the best way to start is by being conscious of how they're spending their time online.

Currently, there is no available website or software to help users see how much time is wasted on social media or other websites, let alone an analytics dashboard that summarises everything concisely. Therefore,self-imposed goals are hard to reinforce. Moreover, the current solutions are too manual, such as asking users to self-record, which may be unsustainable in the long-term for users who need it most. 

Solution:
Instead of a manual recording process that may be inaccurate, we decided to debelop a fully automated, background process to monitor website usage. This means that there is no additional work for users - just download, setup, and let it work in the background. The plugin is passive and non-invasive, only monitoring pre-approved website.
We will also have a user-facing control panel to view usage statistics, ensuring that it is simple to use.

User Stories: 
Gaby has a problem focusing on work when she uses her computer as she often ends up going down the Youtube rabbit hole, neglecting her assignments. She realises that she has this issue of self-discipline, but isn't sure where to start. For a first step, she decides to keep track of the time she spends on Youtube and how much she toggles back and forth between the site and her assignments. She also realises that she uses Facebook when procrastinating. Hence, she finds Focus, which is a simple browser plugin that tracks the amount of time she spends on websites flagged by her. She selects Youtube and Facebook as her "flagged" websites, and at the end of each day, she goes to the analytics dashboard to get a sense of how much time she spends on each website. After seeing that she spends a whopping 4 hours on Youtube and 3 hours on Facebook instead of studying, she decides to make a conscious effort to decrease her usage. Hence, the analytics dashboard has visually displayed the amount of time she has spent on random websites when she could have been focusing on her work. 

Execution: 

Database
Contains files to setup MySQL database, which is currently hosted on localhost. RequestHandler provides API for the extension and dashboard to access the database via XMLHttpRequests.

Extension
The browser extension is hosted on TamperMonkey and uses both standard HTML/javascript functions as well as functions provided by GreaseMonkey under the GM library.

Dashboard
We are using an open-source modular framework, Cube.js, to build the main analytics dashboard / control panel for the users. Cube.js is run back-end as a service, managing the connection to a mySQL database and pre-aggregation, query-queueing and more. Cube.js also exposes an API for our front-end application, allowing us to build customised dashboards and other analytics features. Using ReactJS, we are able to customise the user interface of the analytics dashboard.

=======
## Git repo for Orbital 2020
###### By Tan Pinxi & Amelia Yamato

#### Database

Contains files to setup MySQL database, which is currently hosted on localhost. RequestHandler provides API for the extension and dashboard to access the database via XMLHttpRequests. 

#### Extension

The browser extension is hosted on TamperMonkey and uses both standard HTML/javascript functions as well as functions provided by GreaseMonkey under the GM library.

#### Dashboard

We are using an open-source modular framework, Cube.js, to build the main analytics dashboard / control panel for the users. Cube.js is run back-end as a service, managing the connection to a mySQL database and pre-aggregation, query-queueing and more. Cube.js also exposes an API for our front-end application, allowing us to build customised dashboards and other analytics features. Using ReactJS, we are able to customise the user interface of the analytics dashboard. 
>>>>>>> 5010ee5cbafeb9d93824f8a3dc01de548877616a

