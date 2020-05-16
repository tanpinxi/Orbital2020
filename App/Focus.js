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

    $(document).ready(() => {
        //console.log(GM.listValues());
    });


    $(document).on('mousemove', function() {
        if (isMonitored){
            clearTimeout(timeout);

            timeout = setTimeout(function() {
                console.log('Mouse idle for 10 sec');
                updateCookie();
            }, 10000);
        }
    });

    $(window).on('hashchange', function(e){
        isMonitored = updateCookie()
        if (!isMonitored){
            console.log("Clean Site");
        }
    }).trigger('hashchange');

    function updateCookie() {

        var url = window.location.href;
        var updated = false;

        for (var i = 0; i < monitoredSites.length; i++){
            if (url.includes(monitoredSites[i])){

                updated = true;

                GM.getValue(monitoredSites[i], []).then(x => {

                    if (x.length == 0){
                        console.log("New Monitored Site");
                        var accessTime = $("#datetime").val();
                        GM.setValue(monitoredSites[i], [accessTime]);
                    }
                    else {
                        console.log("Returning Monitored Site");
                        var lastTouchTime = $("#datetime").val();

                        if (x.length == 1){
                            GM.setValue(monitoredSites[i], x.push(lastTouchTime));
                        }
                        else if (x.length == 2){
                            x[1] = lastTouchTime;
                            GM.setValue(monitoredSites[i], x);
                        }
                    }
                });
                break;
            }
        }

        return updated;
    }

})();
