// ==UserScript==
// @name         Derulo
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

var monitor = false;
var monitoredSites = ["facebook.com", "instagram.com", "youtube.com", "reddit.com", "google.com"];

(function() {
    'use strict';

    $(document).ready(() => {
        //console.log(GM.listValues());
    });

    $(window).on('hashchange', function(e){
        var url = window.location.href;
        monitor = false;

        for (var i = 0; i < monitoredSites.length; i++){
            if (url.includes(monitoredSites[i])){

                monitor = true;

                GM.getValue("currentSite", "empty").then(x => {

                    var returning = x.localeCompare(monitoredSites[i]) == 0;

                    if (returning){
                        console.log("Returning Monitored Site");
                    }
                    else {
                        console.log("New Monitored Site");
                        GM.setValue("currentSite", monitoredSites[i]);
                    }
                });
                break;
            }
        }

        if (!monitor){
            GM.setValue("currentSite", "empty");
            console.log("Clean Site");
        }
    }).trigger('hashchange');

})();
