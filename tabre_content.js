/*jslint browser: true, devel: true */
/*global findRegExpBar: false, chrome: false, console: false, navigator: false, document: false */
    'use strict';
(function() {
    var loading = "loading started at " + new Error().stack.split(/\s+/)[2] + "\n(" + (chrome.app.getDetails() && chrome.app.getDetails().name || "no chrome.app.getDetails()") + ") takes";
    console.time(loading);
    //TODO Place following code where timed section should end.
    //console.timeEnd(loading);
    //console.log("Reload it with Ctrl+R or as follows:\nlocation.reload(true)");
    //console.log("injection into " + document.URL + " in\n" + JSON.stringify(navigator.userAgent) + "\nends at\n" + JSON.stringify(Date()));
    //    document.addEventListener('readystatechange', function(event) {
    //        if (event.target.readyState !== "complete") {
    //            return;
    //        }
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.text && document.body) {
            var exactMatches = document.body.textContent.match(new RegExp(message.text, "g"));
            //                if (exactMatches.length < 100) {
            //                    var ignoreCaseMatches = document.body.textContent.match(new RegExp(message.text, "gi"));
            //                }
            if (message.todo === 'makeSuggestions') {
                var suggest = [];
                suggest.push({
                    'content': location.href,
                        'description': '<match>' + message.text + '</match> matches exactly ' + exactMatches.length + ' times in <url>' + location.href + '</url> <dim>' + document.title + '</dim>'
                });
                sendResponse(suggest);
            }
            if (message.todo === 'showSearchBox') {
                var frb = new findRegExpBar();
                frb.catchFind();
                frb.searchRegExp(message.text, "global", !"ignoreCase", !"multiline");
            }
        }
    });
    //    }, false);
    console.timeEnd(loading);
    console.log("Reload it with Ctrl+R or as follows:\nlocation.reload(true)");
    console.log("injection into " + document.URL + " in\n" + JSON.stringify(navigator.userAgent) + "\nends at\n" + JSON.stringify(Date()));
})();