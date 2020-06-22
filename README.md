## Git repo for Orbital 2020
##### Level: Gemini
###### By Tan Pinxi & Amelia Yamato

### Problem: 
Currently, many teenagers and young adults are highly distracted by social media and entertainment websites when working on their computers. With study and work commitments, it is important for one to manage their time well, and the best way to start is by being conscious of how they're spending their time online.

Currently, there is no available website or software to help users see how much time is wasted on social media or other websites, let alone an analytics dashboard that summarises everything concisely. Therefore,self-imposed goals are hard to reinforce. Moreover, the current solutions are too manual, such as asking users to self-record, which may be unsustainable in the long-term for users who need it most. 

### Solution:
Instead of a manual recording process that may be inaccurate, we decided to debelop a fully automated, background process to monitor website usage. This means that there is no additional work for users - just download, setup, and let it work in the background. The plugin is passive and non-invasive, only monitoring pre-approved website.
We will also have a user-facing control panel to view usage statistics, ensuring that it is simple to use.

### User Stories: 
Gaby has a problem focusing on work when she uses her computer as she often ends up going down the Youtube rabbit hole, neglecting her assignments. She realises that she has this issue of self-discipline, but isn't sure where to start. For a first step, she decides to keep track of the time she spends on Youtube and how much she toggles back and forth between the site and her assignments. She also realises that she uses Facebook when procrastinating. Hence, she finds Focus, which is a simple browser plugin that tracks the amount of time she spends on websites flagged by her. She selects Youtube and Facebook as her "flagged" websites, and at the end of each day, she goes to the analytics dashboard to get a sense of how much time she spends on each website. After seeing that she spends a whopping 4 hours on Youtube and 3 hours on Facebook instead of studying, she decides to make a conscious effort to decrease her usage. Hence, the analytics dashboard has visually displayed the amount of time she has spent on random websites when she could have been focusing on her work. 

### Execution: 

#### Product Demo


#### Database
Contains files to setup MySQL database, which is currently hosted on localhost. RequestHandler provides API for the extension and dashboard to access the database via XMLHttpRequests.

#### Extension
The browser extension is hosted on TamperMonkey and uses both standard HTML/javascript functions as well as functions provided by GreaseMonkey under the GM library.

#### Interactive Dashboard (User Interface)
We are using an open-source modular framework, Cube.js, to build the main analytics dashboard / control panel for the users. Cube.js is run back-end as a service, managing the connection to a mySQL database and pre-aggregation, query-queueing and more. Cube.js also exposes an API for our front-end application, allowing us to build customised dashboards and other analytics features. Using ReactJS, we are able to customise the user interface of the analytics dashboard.

### Feature Breakdown 

* Extension 

Helps to keep track of the usage time for each website.

* Custom website selection 

Allows users to select the sites that they'd like to flag. 

* Interactive Analytics Dashboard 
  * 


### Why this product satisfies User Needs:
Since the main intention of the browser plug-in is to make users more aware of their usage of certain websites and make them conscious of how they are spending their time, rather than explicitly *limiting* usage times, we believe that the interactive and user-friendly dashboard will be able to achieve this. 

Though there may be existing products that help users track their screen time in-browser, they either more manual to start the tracking (Toggl app) or does not provide a usage breakdown by website. Hence, by integrating a browser plugin with an interactive web application, we are able to satisfy the needs of users. 

### How we evaluated our solution:

1. User focus group / interview 

We gathered a group of our 10 friends and walked them through the installation instructions for the web application, and how to launch the webpage. We focused on making sure that out solution was easy for users to set up and use, so that they would want to keep using it. This is the main point of our product, ensuring the ease of monitoring website usage time so that users will build a sustainable habit.

2. Self-evaluation

**Key Feedback**

*

### Installation Instructions: 

If you'd like to test the web application on your own device, please follow these installation instructions: 

1. Clone this repository into a folder of your choice 
2. Install node, npm and mySQL
3. 

### Features for the Next Phase 

* Implementing a time restriction 

Since our target audience for the application are people who would like to limit their usage on certain flagged sites, we would like to take it further by prompting the user to reduce their usage if their screen time or time on a certain website reaches a certain level. This can possibly be in the form of a reminder.

* 

### Link to Log

[Orbital Project Log](https://docs.google.com/spreadsheets/d/1SRgkBZBMHGSurudhpTh65sO5Hk9Beoih99OlxObK6D8/edit?usp=sharing)


