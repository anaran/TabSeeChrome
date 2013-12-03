/*jslint browser: true, devel: true */
/*global chrome: false, console: false, navigator: false, document: false */
    'use strict';
(function() {
    var loading = "loading started at " + new Error().stack.split(/\s+/)[2] + "\n(" + (chrome.app.getDetails() && chrome.app.getDetails().name || "no chrome.app.getDetails()") + ") takes";
    console.time(loading);
    //TODO Place following code where timed section should end.
    //console.timeEnd(loading);
    //console.log("Reload it with Ctrl+R or as follows:\nlocation.reload(true)");
    //console.log("injection into " + document.URL + " in\n" + JSON.stringify(navigator.userAgent) + "\nends at\n" + JSON.stringify(Date()));
    //chrome.omnibox reference
    //
    //Types
    //
    //SuggestResult
    //
    //A suggest result.
    //Properties of SuggestResult
    //
    //content ( string )
    //The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry.
    //description ( string )
    //The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match.
    //Methods
    //
    //setDefaultSuggestion
    //
    chrome.omnibox.setDefaultSuggestion({
        'description': 'description for chrome.omnibox.setDefaultSuggestion'
    });
    //Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.
    //
    //Parameters
    //
    //suggestion ( object )
    //A partial SuggestResult object, without the 'content' parameter.
    //Properties of suggestion
    //
    //description ( string )
    //The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match.
    //Events
    //
    //onInputStarted
    //
    //User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events.
    //
    //addListener
    //
    chrome.omnibox.onInputStarted.addListener(function() {
        console.trace();
    });
    //Parameters
    //
    //callback ( function )
    //Callback
    //
    //The callback parameter should specify a function that looks like this:
    //
    //function() {...};
    //onInputChanged
    //
    //User has changed what is typed into the omnibox.
    //
    //addListener
    //
    chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
        console.log(text, suggest);
        if (text.length > 3) {
            chrome.tabs.query({
                active: true,
                currentWindow: true,
                status: "complete"
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    text: text
                }, function(response) {
                    console.log(response);
                    if (response) {
                        suggest(response);
                    }
                    //    suggest([{
                    //        content: "c",
                    //        description: 'description c'
                    //    }, {
                    //        content: "d",
                    //        description: 'description d'
                    //    }]);
                });
            });
        }
    });
    //Parameters
    //
    //callback ( function )
    //Callback
    //
    //The callback parameter should specify a function that looks like this:
    //
    //function(string text, function suggest) {...};
    //text ( string )
    //suggest ( function )
    //A callback passed to the onInputChanged event used for sending suggestions back to the browser.
    //onInputEntered
    //
    //User has accepted what is typed into the omnibox.
    //
    //addListener
    //
    chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
        console.log(text, disposition); /*alert(JSON.stringify({text, disposition}, null, 2));*/
    });
    //Parameters
    //
    //callback ( function )
    //Callback
    //
    //The callback parameter should specify a function that looks like this:
    //
    //function(string text, enum of "currentTab", "newForegroundTab", or "newBackgroundTab" disposition) {...};
    //text ( string )
    //disposition ( enum of "currentTab", "newForegroundTab", or "newBackgroundTab" )
    //The window disposition for the omnibox query. This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.
    //onInputCancelled
    //
    //User has ended the keyword input session without accepting the input.
    //
    //addListener
    //
    chrome.omnibox.onInputCancelled.addListener(function() {
        console.trace();
    });
    //Parameters
    //
    //callback ( function )
    //Callback
    //
    //The callback parameter should specify a function that looks like this:
    //
    //function() {...};
    console.timeEnd(loading);
    console.log("Reload it with Ctrl+R or as follows:\nlocation.reload(true)");
    console.log("injection into " + document.URL + " in\n" + JSON.stringify(navigator.userAgent) + "\nends at\n" + JSON.stringify(Date()));
})();