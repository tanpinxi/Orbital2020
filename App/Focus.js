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
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

var isMonitored;
var timeout = null;
var monitoredSites = ["facebook.com", "instagram.com", "youtube.com", "reddit.com", "google.com"];

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

    $(window).on('hashchange', () => {
    }).trigger('hashchange');

    function updateCookie() {

        const site = getSite();

        if (site.localeCompare("") != 0){

            GM.getValue(site, []).then(x => {

                var timeNow = new Date($.now());

                if (x.length == undefined || x.length == 0){
                    console.log("New site accessed at " + timeNow);
                    GM.setValue(currentSite, [timeNow]);
                }
                else if (x.length == 1){
                    console.log("Site last checked at " + timeNow);
                    x.push(timeNow);
                    GM.setValue(site, x);
                }
                else if (x.length == 2){
                    console.log("Site last check updated to " + timeNow);
                    x[1] = timeNow;
                    GM.setValue(site, x);
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
                const diff = x[1] - x[0];
                storeUsage(site, diff);
            }
        });
    }

    function storeUsage(site, diff){
    }

    function getSite(){

        const url = window.location.href;

        for (var i = 0; i < monitoredSites.length; i++){
            if (url.includes(monitoredSites[i])){
                return monitoredSites[i];
            }
        }
        return "";
    }

})();
