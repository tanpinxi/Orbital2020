// ==UserScript==
// @name         Focus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http://*/*
// @include      https://*/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @grant        GM.listValues
// @grant        GM.xmlHttpRequest
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

var isMonitored;
var timeout = null;

(function() {
    'use strict';

    $(window).on("load", () => {

        console.log("Ready/Loaded");

        isMonitored = updateCookie();
        if (!isMonitored){
            console.log("Clean Site");
        }
    });

    $(window).on("unload", () => {
        console.log("Unloaded");
        clearCookie();
    });

    $(document).on('mousemove', () => {
        if (isMonitored){
            clearTimeout(timeout);

            timeout = setTimeout(function() {
                console.log('Mouse idle for 2 sec');
                updateCookie();
            }, 2000);
        }
    });

    function updateCookie() {

        const site = getSite();

        if (site.localeCompare("") != 0) {

            GM.getValue(site, []).then(x => {

                var timeNow = new Date($.now());

                if (x.length == undefined || x.length == 0){
                    console.log("New site accessed at " + timeNow);
                    GM.setValue(site, [timeNow]);
                }
                else if (x.length == 1){
                    console.log("Site last checked at " + timeNow);
                    x.push(timeNow);
                    GM.setValue(site, x);
                }
                else if (x.length == 2){

                    if (new Date(x[0]).getDate() === timeNow.getDate()){

                        console.log("Site last check updated to " + timeNow);

                        x[1] = timeNow;
                        GM.setValue(site, x);
                    }
                    else {

                        console.log("Site accessed through midnight");

                        var midnight = new Date(x[0]).setHours(24,0,0,0);
                        const date = new Date(x[0]);
                        const dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        storeUsage(site, dateString, (midnight - new Date(x[0]))/1000/60);
                        GM.setValue(site, [timeNow]);
                    }
                }
                else{
                    console.log("Cookie has length " + x.length);
                }
            });
            return true;
        }
        return false;
    }

    function clearCookie(){
        const site = getSite();

        if (site.localeCompare("") != 0) {

            GM.getValue(site, []).then(x => {
                if (x.length == 2){
                    const diff = (new Date(x[1]) - new Date(x[0]))/1000/60;

                    const date = new Date(x[1]);
                    const dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    console.log(diff + " mins used on " + dateString);

                    if (diff > 1) {
                        storeUsage(site, dateString, diff);
                    }
                    else {
                        storeUsage(site, dateString, 1);
                    }
                }
            });

            GM.deleteValue(site);
        }
    }

    function storeUsage(site, date, diff){

        const jsonString = '{"site": "' + site + '", "date": "' + date + '", "usage": ' + diff + '}';
        console.log("Sending to DB: " + jsonString);
        const jsonData = JSON.parse(jsonString);

        GM.xmlHttpRequest({
            method: "POST",
            url: "http://localhost:8080/storeusage",
            data: jsonString,
            headers: {
                "Content-Type":"application/json",
            },
            onload: function(response) {
                console.log(response);
            }
        });
    }

    function getSite(){

        const storedData = document.cookie;
        var sitesArray = [];

        //console.log("Browser cookies: " + storedData);

        if (storedData.indexOf("sites=") != -1){
            const section = storedData.substring(storedData.indexOf("sites="), storedData.length).split(";")[0];
            if (section.length > 6){
                sitesArray = section.substring(6, section.length).split(",");
                return findSite(sitesArray);
            }
        }

        getMonitoredSites();
        return "";
    }

    function findSite(sitesArray){

        const url = window.location.href;

        for (var i = 0; i < sitesArray.length; i++){
            if (url.includes(sitesArray[i])){
                console.log(sitesArray[i]);
                return sitesArray[i];
            }
        }
        return "";
    }

    function getMonitoredSites(){

        GM.xmlHttpRequest({
            method: "POST",
            url: "http://localhost:8080/getsites",
            headers: {
                "Content-type":"application/x-www-form-urlencoded",
            },
            onload: function(response) {

                const siteJson = JSON.parse(response.responseText);
                //console.log(siteJson);

                var storageString = "";

                if (siteJson.length > 0){
                    storageString += siteJson[0].site
                }

                for (var i = 1; i < siteJson.length; i++){
                    storageString += "," + siteJson[i].site;
                }

                if (typeof storageString !== 'undefined' && storageString.localeCompare("") != 0){
                    document.cookie = "sites=" + storageString + "; max-age=3600";
                    //console.log("Cookie as stored: " + document.cookie);
                }
            }
        });
    }

})();
