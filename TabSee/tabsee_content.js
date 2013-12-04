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
        //        New Tab has no document.title
        if (message.text && document.title && document.body) {
            var ignoreCaseMatches, exactMatches = document.body.textContent.match(new RegExp(message.text, "g"));
            if (!exactMatches) {
                ignoreCaseMatches = document.body.textContent.match(new RegExp(message.text, "gi"));
            }
            if (message.todo === 'makeSuggestions') {
                var suggest = [];
                var title = document.title;
                //                NOTE Let's keep the query (search) part, which may specify locale and similar options.
                var url = location.href.replace(location.hash, '');
                //                var url = location.href.replace(location.hash, '').replace(location.search, '');
                if (title.length > 50) {
                    title = title.substring(0, 25) + '...' + title.substring(title.length - 25, title.length);
                }
                if (exactMatches) {
                    suggest.push({
                        'content': url,
                        //                    '<url>' + location.href + '</url>+ '</dim>'
                        'description': title + ' matches ' + '<match>' + message.text + '</match> ' + exactMatches.length + ' times' + ' (exact case)'
                    });
                    sendResponse(suggest);
                } else if (ignoreCaseMatches) {
                    suggest.push({
                        'content': url,
                        //                        'description': '<url>' + location.href + '</url> <dim>' + document.title + '</dim>'+' matches ' + '<match>' + message.text + '</match>' + ' (case mismatch) ' + ignoreCaseMatches.length + ' times'
                        'description': title + ' matches ' + '<match>' + message.text + '</match> ' + ignoreCaseMatches.length + ' times' + ' (ignoring case)'
                    });
                    sendResponse(suggest);
                }
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