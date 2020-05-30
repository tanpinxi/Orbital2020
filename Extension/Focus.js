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

        if (site.localeCompare("") != 0){

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
                    console.log("Site last check updated to " + timeNow);

                    if (x[0].getDate() === timeNow.getDate()){
                        x[1] = timeNow;
                        GM.setValue(site, x);
                    }
                    else {
                        var midnight = new Date(x[0]).setHours(24,0,0,0);
                        const date = x[0].getDate();
                        storeUsage(site, date, (midnight - x[0])/1000/60);
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

        GM.getValue(site, []).then(x => {
            if (x.length == 2){
                const diff = (x[1] - x[0])/1000/60;
                console.log(diff);
                if (diff > 0){
                    const date = x[1].getDate();
                    storeUsage(site, date, diff);
                }
            }
        });

        GM.deleteValue(site);
    }

    function storeUsage(site, date, diff){

        const data = { "site":site, "date":date, "time":diff };
        const jsonData = JSON.stringify(data);

        GM.xmlHttpRequest({
            method:     "POST",
            url:        "http://localhost:8080/storeusage",
            data:       jsonData,
            headers:    {"Content-Type": "application/json"}
        });
    }

    function getSite(){

        const storedData = document.cookie;
        var sitesArray = [];

        console.log("Browser cookies: " + storedData);

        if (typeof storedData !== 'undefined' && storedData.length > 0){
            if (storedData.indexOf("sites=") != -1){
                const section = storedData.substring(storedData.indexOf("sites="), storedData.length).split(";")[0];
                if (section.length > 6){
                    sitesArray = section.substring(6, section.length).split(",");
                    return findSite(sitesArray);
                }
            }
        }

        if (sitesArray.length == 0){
            return getMonitoredSites();
        }
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

        //return "facebook.com,instagram.com,youtube.com,reddit.com,google.com";

        GM.xmlHttpRequest({
            method:     "POST",
            url:        "http://localhost:8080/getsites",
            onload: function(response) {

                const siteJson = JSON.stringify(response);

                console.log(siteJson);

                /*
                var storageString = "";

                if (siteJson.length > 0){
                    storageString += siteJson[0].site
                }

                for (var i = 1; i < siteJson.length; i++){
                    storageString += "," + siteJson[i].site;
                }

                console.log("Received: " + storageString);

                if (typeof storageString !== 'undefined' && storageString.localeCompare("") != 0){
                    document.cookie = "sites=" + storageString + "; max-age=3600";
                    console.log("Cookie as stored: " + document.cookie);
                    sitesArray = sites.split(",");
                    return findSite(sitesArray);
                }
                */

                return "";
            }
        });
    }

})();
